# Generated by Django 3.1.3 on 2020-12-28 18:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vindlemessages', '0002_vindlemessages'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vindlemessages',
            name='author',
            field=models.CharField(max_length=30),
        ),
    ]
