from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from elasticsearch import Elasticsearch
from elasticsearch_dsl import Search, Q
from .serializers import MainTop5Serializer, CategoryTop3Serializer, TitleSenseCountSerializer, PlaytimeViewsSumSerializer, TotalViewsLikesCommentsSerializer, HashTagCountSerializer, DocumentCountByCategorySerializer, DocumentViewsSumByChannelAndCategorySerializer, SearchKeywordSerializer
from django.conf import settings
import re

def time_check():
    
    # 현재 날짜와 시간을 UTC로 가져옴
    utc_now = datetime.utcnow()
    # 현재 시간의 분과 초를 00으로 설정
    utc_now = utc_now.replace(minute=0, second=0, microsecond=0)
    
    # UTC 시간을 한국 시간대로 변환
    kor_now = utc_now + timedelta(hours=9)
    kor_current_time_str = kor_now.strftime("%Y-%m-%d %H:%M:%S")
    kor_current_time = datetime.strptime(kor_current_time_str, "%Y-%m-%d %H:%M:%S")
    
    # 현재 시간으로부터 1시간 전
    kor_one_hour_ago = kor_current_time - timedelta(hours=1)
    # 현재 시간으로부터 25시간 전으로 설정 (24시간 범위 내에 있는 도큐먼트를 찾기 위함)
    kor_25_hours_ago = kor_current_time - timedelta(hours=25)
    
    return kor_one_hour_ago, kor_25_hours_ago

##### Main Ranking #####
# Main 조회수, 댓글 수, 좋아요 수 통합
class MainTop5View(APIView):
    def get(self, request):
        kor_one_hour_ago, kor_25_hours_ago = time_check()
        kor_one_hour_ago_str = kor_one_hour_ago.strftime("%Y-%m-%d %H:%M:%S")
        kor_25_hours_ago_str = kor_25_hours_ago.strftime("%Y-%m-%d %H:%M:%S")

        # 쿼리 파라미터로 필드 이름 받아오기
        field_name = request.GET.get('tp', 'views')  # 기본값이 views
        
        # dt를 한 시간 단위로 쪼개기
        dt_intervals = []
        for i in range(24):
            temp_dt = kor_one_hour_ago - timedelta(hours=i)
            dt_intervals.append(temp_dt)

        response_data = {}

        top5_links = []
        top5_thumbnails = []
        top5_ch_names = []
        top5_titles = []
        top5_senses = []
        top5_uts = []

        for idx, temp_dt in enumerate(dt_intervals):

            hits_data = []

            # 인덱스 이름 설정
            index_name = 'youtube-hist-' + temp_dt.strftime('%Y%m%d')
            temp_dt_str = temp_dt.strftime("%Y-%m-%d %H:%M:%S")
            
            # top5 먼저 뽑기
            if idx == 0:
                s = Search(using='default').index(index_name)
                s = s.query('term', dt=temp_dt_str)
                s = s.filter('range', ut={'gte': kor_25_hours_ago_str, 'lte': kor_one_hour_ago_str})

                if field_name == 'views':
                    s = s.sort('-cum_views')
                elif field_name == 'likes':
                    s = s.sort('-cum_likes')
                elif field_name == 'comments':
                    s = s.sort('-cum_comments')
                else:
                    s = s.sort('-cum_views')

                s = s[:5]

                for hit in s:
                    top5_links.append(hit.link)
                    top5_thumbnails.append(hit.thumbnail)
                    top5_ch_names.append(hit.ch_name)
                    top5_titles.append(hit.title)
                    top5_senses.append(hit.sense)
                    top5_uts.append(hit.ut)

                    hits_data.append({
                        'thumbnail': hit.thumbnail,
                        'link': hit.link,
                        'ch_name': hit.ch_name,
                        'title': hit.title,
                        'sense': hit.sense,
                        'ut': hit.ut,
                        'counts': getattr(hit, field_name, 0),
                        'cum_counts': getattr(hit, 'cum_' + field_name, 0)
                    })

                # 직렬화하여 데이터 추가
                serializer = MainTop5Serializer(data=hits_data, many=True)
                serializer.is_valid(raise_exception=True)
                response_data[temp_dt_str] = serializer.data
            
            else:
                for idy in range(5):
                    s = Search(using='default').index(index_name)
                    if idy < len(top5_links):
                        # 리스트의 인덱스가 존재하는 경우 처리
                        nested_query = Q('term', dt=temp_dt_str) & Q('term', link=top5_links[idy])
                        s = s.query(nested_query)
                        search_result = s.execute()

                        if search_result:
                            for hit in s:
                                hits_data.append({
                                    'thumbnail': hit.thumbnail,
                                    'link': hit.link,
                                    'ch_name': hit.ch_name,
                                    'title': hit.title,
                                    'sense': hit.sense,
                                    'ut': hit.ut,
                                    'counts': getattr(hit, field_name, 0),
                                    'cum_counts': getattr(hit, 'cum_' + field_name, 0)
                                })
                        else:
                            # 검색 결과가 없을 때 0으로
                            hits_data.append({
                                'thumbnail': top5_thumbnails[idy],
                                'link': top5_links[idy],
                                'ch_name': top5_ch_names[idy],
                                'title': top5_titles[idy],
                                'sense': top5_senses[idy],
                                'ut': top5_uts[idy],
                                'counts': 0,
                                'cum_counts': 0
                            })
                        
                    else:
                        # 리스트의 인덱스 범위를 초과한 경우 처리
                        pass

                # 직렬화하여 데이터 추가
                serializer = MainTop5Serializer(data=hits_data, many=True)
                serializer.is_valid(raise_exception=True)
                response_data[temp_dt_str] = serializer.data
        
        return Response([response_data])


##### Category Ranking #####
# 카테고리 Top3
class CategoryTop3View(APIView):
    def get(self, request):
        
        kor_one_hour_ago, kor_25_hours_ago = time_check()
        kor_one_hour_ago_str = kor_one_hour_ago.strftime("%Y-%m-%d %H:%M:%S")
        kor_25_hours_ago_str = kor_25_hours_ago.strftime("%Y-%m-%d %H:%M:%S")
        
        # dt를 한 시간 단위로 쪼개기
        dt_intervals = []
        for i in range(24):
            temp_dt = kor_one_hour_ago - timedelta(hours=i)
            dt_intervals.append(temp_dt)
            
        # 카테고리 값을 가져오기 위해 ct 쿼리 파라미터를 읽어옵니다.
        category = request.GET.get('ct')

        response_data = {}
        top3_links = []
        top3_thumbnails = []
        top3_ch_names = []
        top3_titles = []
        top3_senses = []
        top3_uts = []
        
        for idx, temp_dt in enumerate(dt_intervals):
            
            hits_data = []
            
            # 인덱스 이름 설정
            index_name = 'youtube-hist-' + temp_dt.strftime('%Y%m%d')
            temp_dt_str = temp_dt.strftime("%Y-%m-%d %H:%M:%S")
            
            # top3 먼저 뽑기
            if idx == 0:

                # Elasticsearch 쿼리 정의
                s = Search(using='default').index(index_name)
                
                # 기준 시간대가 dt이고 카테고리(category) 값과 일치하는 문서들을 가져오는 쿼리
                s = s.query('bool', must=[Q('term', dt=temp_dt_str), Q('term', category=category)])
                
                s = s.filter('range', ut={'gte': kor_25_hours_ago_str, 'lte': kor_one_hour_ago_str})
                s = s.sort('-total_score')
                s = s[:3]
                
                for hit in s:
                    top3_links.append(hit.link)
                    top3_thumbnails.append(hit.thumbnail)
                    top3_ch_names.append(hit.ch_name)
                    top3_titles.append(hit.title)
                    top3_senses.append(hit.sense)
                    top3_uts.append(hit.ut)
                    
                    hits_data.append({
                        'thumbnail': hit.thumbnail,
                        'link': hit.link,
                        'ch_name': hit.ch_name,
                        'title': hit.title,
                        'sense': hit.sense,
                        'ut': hit.ut,
                        'views': hit.views,
                        'likes': hit.likes,
                        'comments': hit.comments,
                        'category': category,
                        'total_score': hit.total_score,
                        'cum_views': hit.cum_views,
                        'cum_likes': hit.cum_likes,
                        'cum_comments': hit.cum_comments,
                    })
            
                # 직렬화하여 데이터 추가
                serializer = CategoryTop3Serializer(data=hits_data, many=True)
                serializer.is_valid(raise_exception=True)
                response_data[temp_dt_str] = serializer.data
            
            else:
                for idy in range(min(3, len(top3_thumbnails))):

                    # Elasticsearch 쿼리 정의
                    s = Search(using='default').index(index_name)
                            
                    # 기준 시간대가 dt이면서 link 값이 일치하는 문서들을 가져오는 중첩된 쿼리 추가
                    nested_query = Q('term', dt=temp_dt_str) & Q('term', link=top3_links[idy])
                    s = s.query(nested_query)
                    
                    search_result = s.execute()
                    
                    if search_result:
                    
                        for hit in s:
                            hits_data.append({
                                'thumbnail': hit.thumbnail,
                                'link': hit.link,
                                'ch_name': hit.ch_name,
                                'title': hit.title,
                                'sense': hit.sense,
                                'ut': hit.ut,
                                'views': hit.views,
                                'likes': hit.likes,
                                'comments': hit.comments,
                                'category': category,
                                'total_score': hit.total_score,
                                'cum_views': hit.cum_views,
                                'cum_likes': hit.cum_likes,
                                'cum_comments': hit.cum_comments,
                            })
                    
                    else:
                        # 검색 결과가 없을 때 0으로
                        hits_data.append({
                            'thumbnail': top3_thumbnails[idy],
                            'link': top3_links[idy],
                            'ch_name': top3_ch_names[idy],
                            'title': top3_titles[idy],
                            'sense': top3_senses[idy],
                            'ut': top3_uts[idy],
                            'views': 0,
                            'likes': 0,
                            'comments': 0,
                            'category': category,
                            'total_score': 0.00,
                            'cum_views': 0,
                            'cum_likes': 0,
                            'cum_comments': 0,
                        })
                        
                    # 직렬화하여 데이터 추가
                    serializer = CategoryTop3Serializer(data=hits_data, many=True)
                    serializer.is_valid(raise_exception=True)
                    response_data[temp_dt_str] = serializer.data

        return Response([response_data])


##### DateTerm Analysis #####
# 영상 제목 감성 분석 & 카테고리별 영상 제목 감성 분석
class TitleSenseCountView(APIView):
    def get(self, request):
        category = request.GET.get('ct')
        
        kor_one_hour_ago, kor_25_hours_ago = time_check()
        kor_one_hour_ago_str = kor_one_hour_ago.strftime("%Y-%m-%d %H:%M:%S")
        kor_25_hours_ago_str = kor_25_hours_ago.strftime("%Y-%m-%d %H:%M:%S")
        
        # 인덱스 이름 설정
        index_name = 'youtube-hist-' + kor_one_hour_ago.strftime('%Y%m%d')

        # Elasticsearch 쿼리 정의
        s = Search(using='default').index(index_name)
        s = s.filter('term', dt=kor_one_hour_ago_str)
        s = s.filter('range', ut={'gte': kor_25_hours_ago_str, 'lte': kor_one_hour_ago_str})
        
        # 각 값들에 대한 총 개수를 담을 딕셔너리 초기화
        sense_counts = {'positive': 0, 'negative': 0, 'ambiguous': 0}

        # 카테고리가 특정 카테고리인 경우
        if category != "total":
            # Elasticsearch 쿼리에 카테고리 필터 추가
            s = s.filter('term', category=category)

        # 집계(aggregation)를 사용하여 각 값들에 대한 총 개수 계산
        s.aggs.bucket('sense_counts', 'terms', field='sense')

        # Elasticsearch에 질의 및 결과 가져오기
        response = s.execute()
        
        response_data = {}
        # 집계 결과를 순회하면서 개수를 딕셔너리에 저장
        for bucket in response.aggregations.sense_counts.buckets:
            sense_value = bucket.key
            count = bucket.doc_count
            sense_counts[f'{sense_value}'] = count
            
        serializer = TitleSenseCountSerializer(sense_counts)
        response_data[kor_one_hour_ago_str] = serializer.data
        return Response([response_data])

# 영상 길이별 조회수 총합
class PlaytimeViewsSumView(APIView):
    def get(self, request):
        
        kor_one_hour_ago, kor_25_hours_ago = time_check()
        kor_one_hour_ago_str = kor_one_hour_ago.strftime("%Y-%m-%d %H:%M:%S")
        kor_25_hours_ago_str = kor_25_hours_ago.strftime("%Y-%m-%d %H:%M:%S")
        
        # 인덱스 이름 설정
        index_name = 'youtube-hist-' + kor_one_hour_ago.strftime('%Y%m%d')

        # Elasticsearch 쿼리 정의
        s = Search(using='default').index(index_name)
        s = s.filter('term', dt=kor_one_hour_ago_str)
        s = s.filter('range', ut={'gte': kor_25_hours_ago_str, 'lte': kor_one_hour_ago_str})
        
        # 각 값들에 대한 총 개수를 담을 딕셔너리 초기화
        playtime_category_counts = {'short': 0, 'medium': 0, 'long': 0}

        # 집계(aggregation)를 사용하여 각 값들에 대한 총 개수 계산
        s.aggs.bucket('playtime_category_counts', 'terms', field='playtime_category')
        s.aggs['playtime_category_counts'].metric('sum_cum_views', 'sum', field='cum_views')

        # Elasticsearch에 질의 및 결과 가져오기
        response = s.execute()
        
        response_data = {}
        # 집계 결과를 순회하면서 개수를 딕셔너리에 저장
        for bucket in response.aggregations.playtime_category_counts.buckets:
            playtime_value = bucket.key
            count = bucket.sum_cum_views.value
            playtime_category_counts[f'{playtime_value}'] = count
            
        serializer = PlaytimeViewsSumSerializer(playtime_category_counts)
        response_data[kor_one_hour_ago_str] = serializer.data
        return Response([response_data])

# 영상의 댓글, 좋아요, 조회수 합계 분석
class TotalViewsLikesCommentsView(APIView):
    def get(self, request):
        
        kor_one_hour_ago, kor_25_hours_ago = time_check()
        kor_one_hour_ago_str = kor_one_hour_ago.strftime("%Y-%m-%d %H:%M:%S")
        kor_25_hours_ago_str = kor_25_hours_ago.strftime("%Y-%m-%d %H:%M:%S")
        
        # dt를 한 시간 단위로 쪼개기
        dt_intervals = []
        for i in range(24):
            temp_dt = kor_one_hour_ago - timedelta(hours=i)
            dt_intervals.append(temp_dt)
        
        response_data = {}
        
        for temp_dt in dt_intervals:
            
            results = []
            
            # 인덱스 이름 설정
            index_name = 'youtube-hist-' + temp_dt.strftime('%Y%m%d')
            temp_dt_str = temp_dt.strftime("%Y-%m-%d %H:%M:%S")

            # Elasticsearch 쿼리 정의
            s = Search(using='default').index(index_name)
            
            # 기준 시간대가 dt
            s = s.filter('term', dt=temp_dt_str)
            s = s.filter('range', ut={'gte': kor_25_hours_ago_str, 'lte': kor_one_hour_ago_str})
            
            # Elasticsearch 쿼리에 합계 집계 추가
            s.aggs.metric('total_views', 'sum', field='views')
            s.aggs.metric('total_likes', 'sum', field='likes')
            s.aggs.metric('total_comments', 'sum', field='comments')
            
            # Elasticsearch에 질의 및 결과 가져오기
            response = s.execute()
            
            # 집계 결과를 조회하여 합계 값을 얻음
            total_views = response.aggregations.total_views.value
            total_likes = response.aggregations.total_likes.value
            total_comments = response.aggregations.total_comments.value
            
            # 결과를 딕셔너리에 저장
            result = {
                'total_views': total_views,
                'total_likes': total_likes,
                'total_comments': total_comments
            }
            results.append(result)
        
            serializer = TotalViewsLikesCommentsSerializer(results, many=True)
            response_data[temp_dt_str] = serializer.data
            
        return Response([response_data])

# 해시태그의 등장 수
class HashTagCountView(APIView):
    def get(self, request):
        
        kor_one_hour_ago, kor_25_hours_ago = time_check()
        kor_one_hour_ago_str = kor_one_hour_ago.strftime("%Y-%m-%d %H:%M:%S")
        kor_25_hours_ago_str = kor_25_hours_ago.strftime("%Y-%m-%d %H:%M:%S")
        
        # dt를 한 시간 단위로 쪼개기
        dt_intervals = []
        for i in range(24):
            temp_dt = kor_one_hour_ago - timedelta(hours=i)
            dt_intervals.append(temp_dt)
            
        response_data = {}
        for temp_dt in dt_intervals:
            # 인덱스 이름 설정
            index_name = 'youtube-hist-' + temp_dt.strftime('%Y%m%d')
            temp_dt_str = temp_dt.strftime("%Y-%m-%d %H:%M:%S")

            # Elasticsearch 쿼리 정의
            s = Search(using='default').index(index_name)
            
            # 기준 시간대가 dt
            s = s.filter('term', dt=temp_dt_str)
            s = s.filter('range', ut={'gte': kor_25_hours_ago_str, 'lte': kor_one_hour_ago_str})
            
            
            # 특정 해시태그 필터링을 위한 리스트
            excluded_hashtags = ['JTBC뉴스', 'SBS뉴스', '누르고', '상암동클라스', '자막뉴스', 'MBN', '굿모닝월드', '이슈픽', '뉴스영상', '광클e뉴스', 'YTN자막뉴스', '도시락있슈', '월드클라스', '8뉴스', 'MBN날씨', 'MBN뉴스7', '실시간', '굿모닝MBN', '채널A', '뉴스A', 'MBN아침앤매일경제', '현장영상', '뉴스다', 'JTBC뉴스룸', '채널A뉴스', 'MBC충북', 'MBC강원영동', '뉴스5후', '디이슈', '사건반장', '오뉴스', 'D리포트', 'SBS단독보도', '김명준의_뉴스파이터', '광주MBC', '스브스픽', '1일1뉴스', '오클릭', '모닝와이드', '뉴스딱', '인터넷와글와글', '끝까지판다', '뉴스A라이브', '뉴스alive', '대전MBC', '글로벌픽', '부산MBC', '오늘반장픽']
            
            # Elasticsearch 쿼리에 해시태그 집계 추가
            s.aggs.bucket('hashtags', 'terms', field='hashtag', size=20)
            # Elasticsearch에 질의 및 결과 가져오기
            response = s.execute()

            # 집계 결과를 조회하여 해시태그별 top5 데이터를 얻음
            hashtag_data = {}
            for bucket in response.aggregations.hashtags.buckets:
                hashtag = bucket.key
                count = bucket.doc_count
                
                if not re.search(r'(기자|아나운서|앵커)$', hashtag) and hashtag not in excluded_hashtags:
                    hashtag_data[hashtag] = count
            
            # Sort the hashtags by count in descending order and take the top 5
            top5_data = sorted(hashtag_data.items(), key=lambda x: x[1], reverse=True)[:5]
            top5_data = [{'hashtag': hashtag, 'count': count} for hashtag, count in top5_data]

            serializer = HashTagCountSerializer(top5_data, many=True)
            response_data[temp_dt_str] = serializer.data

        return Response([response_data])
    
# 카테고리별 영상 수
class DocumentCountByCategoryView(APIView):
    def get(self, request):
        
        kor_one_hour_ago, kor_25_hours_ago = time_check()
        kor_one_hour_ago_str = kor_one_hour_ago.strftime("%Y-%m-%d %H:%M:%S")
        kor_25_hours_ago_str = kor_25_hours_ago.strftime("%Y-%m-%d %H:%M:%S")
        
        # 인덱스 이름 설정
        index_name = 'youtube-hist-' + kor_one_hour_ago.strftime('%Y%m%d')

        # Elasticsearch 쿼리 정의
        s = Search(using='default').index(index_name)
        s = s.filter('term', dt=kor_one_hour_ago_str)
        s = s.filter('range', ut={'gte': kor_25_hours_ago_str, 'lte': kor_one_hour_ago_str})
        
        s.aggs.bucket('categories', 'terms', field='category')

        response = s.execute()
        
        result_data = {}
        data = []
        # 데이터 추출
        for bucket in response.aggregations.categories.buckets:
            category_data = {
                'category': bucket.key,
                'document_count': bucket.doc_count
            }
            data.append(category_data)
        
        result_data[kor_one_hour_ago_str] = data
        
        # 데이터 직렬화
        serializer = DocumentCountByCategorySerializer(data=data, many=True)
        serializer.is_valid()  # 유효성 검사
        return Response([{kor_one_hour_ago_str: serializer.data}])

# 채널별 카테고리 영상 수 & 채널별 카테고리의 영상 총 조회수
class DocumentViewsSumByChannelAndCategoryView(APIView):
    def get(self, request):

        kor_one_hour_ago, kor_25_hours_ago = time_check()
        kor_one_hour_ago_str = kor_one_hour_ago.strftime("%Y-%m-%d %H:%M:%S")
        kor_25_hours_ago_str = kor_25_hours_ago.strftime("%Y-%m-%d %H:%M:%S")
        
        # 인덱스 이름 설정
        index_name = 'youtube-hist-' + kor_one_hour_ago.strftime('%Y%m%d')

        # Elasticsearch 쿼리 정의
        s = Search(using='default').index(index_name)
        
        # 쿼리 설정
        s = s.query('term', dt=kor_one_hour_ago_str)
        s = s.filter('range', ut={'gte': kor_25_hours_ago_str, 'lte': kor_one_hour_ago_str})

        # 채널별로 집계
        s.aggs.bucket('channels', 'terms', field='ch_name', size=10)
        s.aggs['channels'].bucket('categories', 'terms', field='category', size=10)

        # 조회수 합계 집계
        s.aggs['channels']['categories'].metric('views_sum', 'sum', field='views')

        # 쿼리 실행
        response = s.execute()
        
        result_data = {}
        data = []
        
        # 카테고리 목록
        all_categories = ['정치', '경제', '사회', '생활문화', '스포츠', 'IT과학', '세계']

        # 데이터 추출
        for bucket in response.aggregations.channels.buckets:
            channel_data = {
                'channel': bucket.key,
                'categories': []
            }

            # 각 카테고리에 대한 정보 확인
            for category in all_categories:
                category_found = False
                for category_bucket in bucket.categories.buckets:
                    if category_bucket.key == category:
                        category_data = {
                            'category': category_bucket.key,
                            'document_count': category_bucket.doc_count,
                            'views_sum': category_bucket.views_sum['value']
                        }
                        channel_data['categories'].append(category_data)
                        category_found = True
                        break
                
                # 카테고리 정보가 없으면 기본값으로 설정
                if not category_found:
                    category_data = {
                        'category': category,
                        'document_count': 0,
                        'views_sum': 0
                    }
                    channel_data['categories'].append(category_data)
            
            data.append(channel_data)
        
        result_data[kor_one_hour_ago_str] = data

        # Serialize the result_data
        serializer = DocumentViewsSumByChannelAndCategorySerializer(data=data, many=True)
        serializer.is_valid()  # 유효성 검사
        return Response([{kor_one_hour_ago_str: serializer.data}])


##### Search Page #####
# 키워드 검색
class SearchKeywordView(APIView):
    def get(self, request):
        
        kor_one_hour_ago, _ = time_check()
        kor_one_hour_ago_str = kor_one_hour_ago.strftime("%Y-%m-%d %H:%M:%S")
        
        # 사용자 입력 데이터
        keyword = request.query_params.get('q', '')  # 검색어
        option = request.query_params.get('opt', 'title')  # 검색 옵션 (기본값은 'title')
        
        # 인덱스 이름 설정
        index_name = 'youtube-hist-' + kor_one_hour_ago.strftime('%Y%m%d')

        # Elasticsearch DSL의 Search 객체를 생성
        s = Search(index=index_name)
        
        # 쿼리 설정
        s = s.query('term', dt=kor_one_hour_ago_str)

        # # MultiMatch 쿼리를 사용하여 검색어를 제목(title) 또는 채널명(ch_name) 또는 카테고리명(category), 해시태그명(hashtag)에 매칭
        # query = MultiMatch(query=keyword, fields=option)
        # s = s.query(query)
        
        # 검색어를 Nori 형태소 분석기로 분석한 후, 분석 결과를 적용하여 매칭하는 쿼리 생성
        query = Q('query_string', query=keyword, fields=[f"{option}.nori_analyzed"], default_operator="AND")
        s = s.query(query)

        #sort_type = request.query_params.get('st', 'ut')  # 기본 정렬은 'ut' (업로드 시간)
        limit = int(request.query_params.get('limit', 10))  # 기본 검색 결과 제한 수는 10개
        
        s = s.sort('-ut')
        s = s[:limit]
        
        response_data = []
        for hit in s:
            data = {
                'thumbnail': hit.thumbnail,
                'link': hit.link,
                'title': hit.title,
                'ch_name': hit.ch_name,
                'hashtag': hit.hashtag,
                'cum_views': hit.cum_views,
                'cum_likes': hit.cum_likes,
                'cum_comments': hit.cum_comments,
                'ut': hit.ut
            }
            
            serializer = SearchKeywordSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            response_data.append(serializer.data)

        return Response(response_data)


##### Statics #####
# Main Top5
class StaticMainTop5View(APIView):
    def get(self, request):
        
        kor_one_hour_ago, _ = time_check()
        
        kor_time_now = kor_one_hour_ago + timedelta(hours=1)
        
        temp_dt = kor_time_now.strftime("%Y%m%d")
        temp_hour = kor_time_now.strftime("%H")
        
        # 쿼리 파라미터로 필드 이름 받아오기
        field_name = request.GET.get('tp')  # 기본값이 views
        
        index_name = 'youtube-stat-mainranking-' + field_name + '-' + temp_dt
        doc_id = temp_hour # temp_hour 로 대체
        
        # Elasticsearch 쿼리 정의
        s = Search(using='default').index(index_name)
        result = s.query('term', _id=doc_id).execute()
        
        # 결과를 저장할 리스트
        source_list = []
        
        # 날짜와 시간에 해당하는 동영상 정보를 리스트에 추가
        if result.hits.total.value > 0:
            hit = result.hits[0]
            formatted_video_list = {}
            for timestamp, video_list in hit.to_dict().items():
                formatted_video_list[timestamp] = video_list
                source_list.append(formatted_video_list)

        return Response(source_list)
    
# Cate Top3
class StaticCateTop3View(APIView):
    def get(self, request):
        
        kor_one_hour_ago, _ = time_check()
        
        kor_time_now = kor_one_hour_ago + timedelta(hours=1)
        
        temp_dt = kor_time_now.strftime("%Y%m%d")
        temp_hour = kor_time_now.strftime("%H")
        
        # 쿼리 파라미터로 필드 이름 받아오기
        field_name = request.GET.get('ct')
        
        index_name = 'youtube-stat-cateranking-' + field_name + '-' + temp_dt
        doc_id = temp_hour # temp_hour 로 대체
        
        # Elasticsearch 쿼리 정의
        s = Search(using='default').index(index_name)
        result = s.query('term', _id=doc_id).execute()
        
        # 결과를 저장할 리스트
        source_list = []
        
        # 날짜와 시간에 해당하는 동영상 정보를 리스트에 추가
        if result.hits.total.value > 0:
            hit = result.hits[0]
            formatted_video_list = {}
            for timestamp, video_list in hit.to_dict().items():
                formatted_video_list[timestamp] = video_list
                source_list.append(formatted_video_list)

        return Response(source_list)

# 영상 제목 감성 분석 & 카테고리별 영상 제목 감성 분석
class StaticTitleSenseCountView(APIView):
    def get(self, request):
        
        kor_one_hour_ago, _ = time_check()
        
        kor_time_now = kor_one_hour_ago + timedelta(hours=1)
        
        temp_dt = kor_time_now.strftime("%Y%m%d")
        temp_hour = kor_time_now.strftime("%H")
        
        # 쿼리 파라미터로 필드 이름 받아오기
        field_name = request.GET.get('ct')
        
        index_name = 'youtube-stat-analysis-titlesentiment-' + field_name + '-' + temp_dt
        doc_id = temp_hour # temp_hour 로 대체
        
        # Elasticsearch 쿼리 정의
        s = Search(using='default').index(index_name)
        result = s.query('term', _id=doc_id).execute()
        
        # 결과를 저장할 리스트
        source_list = []
        
        # 날짜와 시간에 해당하는 동영상 정보를 리스트에 추가
        if result.hits.total.value > 0:
            hit = result.hits[0]
            formatted_video_list = {}
            for timestamp, video_list in hit.to_dict().items():
                formatted_video_list[timestamp] = video_list
                source_list.append(formatted_video_list)

        return Response(source_list)
    
# 영상 길이별 조회수 총합
class StaticPlaytimeViewsSumView(APIView):
    def get(self, request):
        
        kor_one_hour_ago, _ = time_check()
        
        kor_time_now = kor_one_hour_ago + timedelta(hours=1)
        
        temp_dt = kor_time_now.strftime("%Y%m%d")
        temp_hour = kor_time_now.strftime("%H")
        
        index_name = 'youtube-stat-analysis-ptviewstotal-' + temp_dt
        doc_id = temp_hour # temp_hour 로 대체
        
        # Elasticsearch 쿼리 정의
        s = Search(using='default').index(index_name)
        result = s.query('term', _id=doc_id).execute()
        
        # 결과를 저장할 리스트
        source_list = []
        
        # 날짜와 시간에 해당하는 동영상 정보를 리스트에 추가
        if result.hits.total.value > 0:
            hit = result.hits[0]
            formatted_video_list = {}
            for timestamp, video_list in hit.to_dict().items():
                formatted_video_list[timestamp] = video_list
                source_list.append(formatted_video_list)

        return Response(source_list)

# 영상의 댓글, 좋아요, 조회수 합계 분석
class StaticTotalViewsLikesCommentsView(APIView):
    def get(self, request):
        
        kor_one_hour_ago, _ = time_check()
        
        kor_time_now = kor_one_hour_ago + timedelta(hours=1)
        
        temp_dt = kor_time_now.strftime("%Y%m%d")
        temp_hour = kor_time_now.strftime("%H")
        
        index_name = 'youtube-stat-analysis-vlctotal-' + temp_dt
        doc_id = temp_hour # temp_hour 로 대체
        
        # Elasticsearch 쿼리 정의
        s = Search(using='default').index(index_name)
        result = s.query('term', _id=doc_id).execute()
        
        # 결과를 저장할 리스트
        source_list = []
        
        # 날짜와 시간에 해당하는 동영상 정보를 리스트에 추가
        if result.hits.total.value > 0:
            hit = result.hits[0]
            formatted_video_list = {}
            for timestamp, video_list in hit.to_dict().items():
                formatted_video_list[timestamp] = video_list
                source_list.append(formatted_video_list)

        return Response(source_list)
    
# 해시태그의 등장 수
class StaticHashTagCountView(APIView):
    def get(self, request):
        
        kor_one_hour_ago, _ = time_check()
        
        kor_time_now = kor_one_hour_ago + timedelta(hours=1)
        
        temp_dt = kor_time_now.strftime("%Y%m%d")
        temp_hour = kor_time_now.strftime("%H")
        
        index_name = 'youtube-stat-analysis-hashtagcount-' + temp_dt
        doc_id = temp_hour # temp_hour 로 대체
        
        # Elasticsearch 쿼리 정의
        s = Search(using='default').index(index_name)
        result = s.query('term', _id=doc_id).execute()
        
        # 결과를 저장할 리스트
        source_list = []
        
        # 날짜와 시간에 해당하는 동영상 정보를 리스트에 추가
        if result.hits.total.value > 0:
            hit = result.hits[0]
            formatted_video_list = {}
            for timestamp, video_list in hit.to_dict().items():
                formatted_video_list[timestamp] = video_list
                source_list.append(formatted_video_list)

        return Response(source_list)

# 카테고리별 영상 수
class StaticDocumentCountByCategoryView(APIView):
    def get(self, request):
        
        kor_one_hour_ago, _ = time_check()
        
        kor_time_now = kor_one_hour_ago + timedelta(hours=1)
        
        temp_dt = kor_time_now.strftime("%Y%m%d")
        temp_hour = kor_time_now.strftime("%H")
        
        index_name = 'youtube-stat-analysis-categoryvideos-' + temp_dt
        doc_id = temp_hour # temp_hour 로 대체
        
        # Elasticsearch 쿼리 정의
        s = Search(using='default').index(index_name)
        result = s.query('term', _id=doc_id).execute()
        
        # 결과를 저장할 리스트
        source_list = []
        
        # 날짜와 시간에 해당하는 동영상 정보를 리스트에 추가
        if result.hits.total.value > 0:
            hit = result.hits[0]
            formatted_video_list = {}
            for timestamp, video_list in hit.to_dict().items():
                formatted_video_list[timestamp] = video_list
                source_list.append(formatted_video_list)

        return Response(source_list)

# 채널별 카테고리 영상 수 & 채널별 카테고리의 영상 총 조회수
class StaticDocumentViewsSumByChannelAndCategoryView(APIView):
    def get(self, request):

        kor_one_hour_ago, _ = time_check()
        
        kor_time_now = kor_one_hour_ago + timedelta(hours=1)
        
        temp_dt = kor_time_now.strftime("%Y%m%d")
        temp_hour = kor_time_now.strftime("%H")
        
        index_name = 'youtube-stat-analysis-channelcategoryvideosviews-' + temp_dt
        doc_id = temp_hour # temp_hour 로 대체
        
        # Elasticsearch 쿼리 정의
        s = Search(using='default').index(index_name)
        result = s.query('term', _id=doc_id).execute()
        
        # 결과를 저장할 리스트
        source_list = []
        
        # 날짜와 시간에 해당하는 동영상 정보를 리스트에 추가
        if result.hits.total.value > 0:
            hit = result.hits[0]
            formatted_video_list = {}
            for timestamp, video_list in hit.to_dict().items():
                formatted_video_list[timestamp] = video_list
                source_list.append(formatted_video_list)

        return Response(source_list)