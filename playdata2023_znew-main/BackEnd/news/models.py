from django.db import models

##### Main Ranking #####
# 메인 조회수, 댓글 수, 좋아요 수 통합
class MainTop5(models.Model) :
    thumbnail = models.URLField()
    link = models.CharField(max_length=200)
    ch_name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    sense = models.CharField(max_length=100)
    ut = models.DateTimeField()
    counts = models.IntegerField()
    cum_counts = models.IntegerField()

##### Category Ranking #####
# 카테고리 Top3
class CategoryTop3(models.Model):
    thumbnail = models.URLField()
    link = models.CharField(max_length=200)
    ch_name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    sense = models.CharField(max_length=100)
    ut = models.DateTimeField()
    views = models.IntegerField()
    likes = models.IntegerField()
    comments = models.IntegerField()
    category = models.CharField(max_length=100)
    total_score = models.FloatField()
    cum_views = models.IntegerField()
    cum_likes = models.IntegerField()
    cum_comments = models.IntegerField()


##### DateTerm Analysis #####
# 영상 제목 감성 분석 & 카테고리별 영상 제목 감성 분석
class TitleSenseCount(models.Model):
    positive = models.IntegerField()
    negative = models.IntegerField()
    ambiguous = models.IntegerField()

# 영상 길이별 조회수 총합
class PlaytimeViewsSum(models.Model):
    short = models.IntegerField()
    medium = models.IntegerField()
    long = models.IntegerField()

# 영상의 댓글, 좋아요, 조회수 합계 분석
class TotalViewsLikesComments(models.Model):
    total_views = models.IntegerField()
    total_likes = models.IntegerField()
    total_comments = models.IntegerField()

# 해시태그의 등장 수
class HashTagCount(models.Model):
    hashtag = models.CharField(max_length=100)
    count = models.IntegerField()

# 카테고리별 영상 수
class DocumentCountByCategory(models.Model):
    category = models.CharField(max_length=255)
    document_count = models.IntegerField()
    
# 채널별 카테고리의 영상 수 & 채널별 카테고리의 영상 총 조회수
class DocumentViewsSumByChannelAndCategory(models.Model):
    category = models.CharField(max_length=255)
    document_count = models.IntegerField()
    channel = models.CharField(max_length=255)
    views_sum = models.IntegerField()


##### Search Page #####
# 키워드 검색
class SearchKeyword(models.Model):
    thumbnail = models.URLField()
    link = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    ch_name = models.CharField(max_length=100)
    hashtag = models.CharField(max_length=300)
    cum_views = models.IntegerField()
    cum_likes = models.IntegerField()
    cum_comments = models.IntegerField()
    ut = models.DateTimeField()