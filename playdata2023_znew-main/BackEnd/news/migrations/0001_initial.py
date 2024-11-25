# Generated by Django 4.2.3 on 2023-07-11 15:53

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='YoutubeHistory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('link', models.CharField(max_length=20)),
                ('ch_name', models.CharField(max_length=50)),
                ('category', models.CharField(max_length=50)),
                ('views', models.IntegerField()),
                ('dt', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
