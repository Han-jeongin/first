from rest_framework import serializers
from .models import MainTop5, CategoryTop3, TitleSenseCount, PlaytimeViewsSum, TotalViewsLikesComments, HashTagCount, DocumentCountByCategory, DocumentViewsSumByChannelAndCategory, SearchKeyword

##### Main Ranking #####
# 메인 조회수, 댓글 수, 좋아요 수 통합
class MainTop5Serializer(serializers.ModelSerializer) :
    class Meta :
        model = MainTop5
        fields = '__all__'


##### Category Ranking #####
# 카테고리 Top3
class CategoryTop3Serializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryTop3
        fields = '__all__'


##### DateTerm Analsis #####
# 영상 제목 감성 분석 & 카테고리별 영상 제목 감성 분석
class TitleSenseCountSerializer(serializers.ModelSerializer):
    class Meta:
        model = TitleSenseCount
        fields = '__all__'

#영상 길이별 조회수 총합
class PlaytimeViewsSumSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaytimeViewsSum
        fields = '__all__'

# 영상의 댓글, 좋아요, 조회수 합계 분석
class TotalViewsLikesCommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TotalViewsLikesComments
        fields = '__all__'
        
# 해시태그의 등장 수
class HashTagCountSerializer(serializers.ModelSerializer):
    class Meta:
        model = HashTagCount
        fields = '__all__'

# 카테고리별 영상 수
class DocumentCountByCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentCountByCategory
        fields = '__all__'

# 채널별 카테고리의 영상 총 조회수        
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentViewsSumByChannelAndCategory
        fields = ('category', 'document_count', 'views_sum')

class DocumentViewsSumByChannelAndCategorySerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True)
    class Meta:
        model = DocumentViewsSumByChannelAndCategory
        fields = ('channel', 'categories')


##### Search Page #####
# 키워드 검색
class SearchKeywordSerializer(serializers.ModelSerializer):
    hashtag = serializers.ListField(child=serializers.CharField())  # hashtag 필드를 ListField로 처리
    class Meta:
        model = SearchKeyword
        fields = '__all__'