# Generated by Django 3.1.1 on 2020-10-27 21:28

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('grantaccess', '0013_auto_20201027_2227'),
    ]

    operations = [
        migrations.CreateModel(
            name='Faceauth',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('targets', models.TextField(max_length=60)),
                ('train_images', models.ImageField(blank=True, upload_to='train_images')),
            ],
        ),
    ]
