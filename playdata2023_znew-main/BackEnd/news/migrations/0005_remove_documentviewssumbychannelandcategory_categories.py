# Generated by Django 4.2 on 2023-07-13 04:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("news", "0004_documentcountbychannelandcategory_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="documentviewssumbychannelandcategory",
            name="categories",
        ),
    ]