from django.urls import path
from .views import MainTop5View, CategoryTop3View, TitleSenseCountView, PlaytimeViewsSumView, TotalViewsLikesCommentsView, HashTagCountView, DocumentCountByCategoryView, DocumentViewsSumByChannelAndCategoryView, SearchKeywordView, StaticMainTop5View, StaticCateTop3View, StaticTitleSenseCountView, StaticPlaytimeViewsSumView, StaticTotalViewsLikesCommentsView, StaticHashTagCountView, StaticDocumentCountByCategoryView, StaticDocumentViewsSumByChannelAndCategoryView

urlpatterns = [
    
    ##### Main Ranking #####
    # 메인 조회수, 댓글 수, 좋아요 수 통합
    path('main_ranking/', MainTop5View.as_view(), name='main-top5'),
    
    ##### Category Ranking #####
    # 카테고리 Top3
    path('category_ranking/', CategoryTop3View.as_view(), name='category-top3'),
    
    ##### DateTerm Analysis #####
    # 영상 제목 감성 분석 & 카테고리별 영상 제목 감성 분석
    path('analysis/date_term/titlesentiment', TitleSenseCountView.as_view(), name='title-sense-count-ct'),
    # 영상 길이별 조회수 총합
    path('analysis/date_term/pt_views_total', PlaytimeViewsSumView.as_view(), name='playtime-views-sum'),
    # 영상의 댓글, 좋아요, 조회수 합계 분석
    path('analysis/date_term/vlc_total', TotalViewsLikesCommentsView.as_view(), name='total-vlc'),
    # 해시태그의 등장 수
    path('analysis/date_term/hashtag_count', HashTagCountView.as_view(), name='hash-tag-count'),
    # 카테고리별 영상 수
    path('analysis/date_term/category_videos', DocumentCountByCategoryView.as_view(), name='document-count-by-category'),
    # 채널별 카테고리의 영상 수 & 채널별 카테고리의 영상 총 조회수
    path('analysis/date_term/channel_category_videos_views', DocumentViewsSumByChannelAndCategoryView.as_view(), name='document-views-sum-by-channel-and-category'),
    
    ##### Search Page #####
    # 키워드 검색
    path('search/', SearchKeywordView.as_view(), name='search_keyword'),
    
    
    ##### 통계 자료 #####
    path('statics/main_ranking/', StaticMainTop5View.as_view(), name='static-main-top5'),
    
    path('statics/category_ranking/', StaticCateTop3View.as_view(), name='static-category-top3'),
    
    path('statics/date_term/titlesentiment', StaticTitleSenseCountView.as_view(), name='static-title-sense-count-ct'),
    path('statics/date_term/pt_views_total', StaticPlaytimeViewsSumView.as_view(), name='static-playtime-views-sum'),
    path('statics/date_term/vlc_total', StaticTotalViewsLikesCommentsView.as_view(), name='static-total-vlc'),
    path('statics/date_term/hashtag_count', StaticHashTagCountView.as_view(), name='static-hashtag-count'),
    path('statics/date_term/category_videos', StaticDocumentCountByCategoryView.as_view(), name='static-document-count-by-category'),
    path('statics/date_term/channel_category_videos_views', StaticDocumentViewsSumByChannelAndCategoryView.as_view(), name='static-document-views-sum-by-channel-and-category'),
]