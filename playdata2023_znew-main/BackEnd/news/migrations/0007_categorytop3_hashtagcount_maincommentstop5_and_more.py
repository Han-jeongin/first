# Generated by Django 4.2 on 2023-08-01 05:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("news", "0006_delete_documentcountbychannelandcategory"),
    ]

    operations = [
        migrations.CreateModel(
            name="CategoryTop3",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("thumbnail", models.URLField()),
                ("link", models.CharField(max_length=200)),
                ("ch_name", models.CharField(max_length=100)),
                ("title", models.CharField(max_length=200)),
                ("sense", models.CharField(max_length=100)),
                ("ut", models.DateTimeField()),
                ("views", models.IntegerField()),
                ("likes", models.IntegerField()),
                ("comments", models.IntegerField()),
                ("category", models.CharField(max_length=100)),
                ("total_score", models.FloatField()),
                ("cum_views", models.IntegerField()),
                ("cum_likes", models.IntegerField()),
                ("cum_comments", models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name="HashTagCount",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("hashtag", models.CharField(max_length=100)),
                ("count", models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name="MainCommentsTop5",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("thumbnail", models.URLField()),
                ("link", models.CharField(max_length=200)),
                ("ch_name", models.CharField(max_length=100)),
                ("title", models.CharField(max_length=200)),
                ("sense", models.CharField(max_length=100)),
                ("ut", models.DateTimeField()),
                ("comments", models.IntegerField()),
                ("cum_comments", models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name="MainLikesTop5",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("thumbnail", models.URLField()),
                ("link", models.CharField(max_length=200)),
                ("ch_name", models.CharField(max_length=100)),
                ("title", models.CharField(max_length=200)),
                ("sense", models.CharField(max_length=100)),
                ("ut", models.DateTimeField()),
                ("likes", models.IntegerField()),
                ("cum_likes", models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name="MainViewsTop5",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("thumbnail", models.URLField()),
                ("link", models.CharField(max_length=200)),
                ("ch_name", models.CharField(max_length=100)),
                ("title", models.CharField(max_length=200)),
                ("sense", models.CharField(max_length=100)),
                ("ut", models.DateTimeField()),
                ("views", models.IntegerField()),
                ("cum_views", models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name="PlaytimeViewsSum",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("short", models.IntegerField()),
                ("medium", models.IntegerField()),
                ("long", models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name="SearchKeyword",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("thumbnail", models.URLField()),
                ("link", models.CharField(max_length=200)),
                ("title", models.CharField(max_length=200)),
                ("ch_name", models.CharField(max_length=100)),
                ("hashtag", models.CharField(max_length=300)),
                ("cum_views", models.IntegerField()),
                ("cum_likes", models.IntegerField()),
                ("cum_comments", models.IntegerField()),
                ("ut", models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name="TitleSenseCount",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("positive", models.IntegerField()),
                ("negative", models.IntegerField()),
                ("ambiguous", models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name="TotalViewsLikesComments",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("total_views", models.IntegerField()),
                ("total_likes", models.IntegerField()),
                ("total_comments", models.IntegerField()),
            ],
        ),
        migrations.DeleteModel(
            name="YouTubeData",
        ),
    ]
