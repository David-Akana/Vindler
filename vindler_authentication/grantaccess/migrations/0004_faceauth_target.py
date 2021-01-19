# Generated by Django 3.1.1 on 2020-10-20 23:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('grantaccess', '0003_delete_faceauth'),
    ]

    operations = [
        migrations.CreateModel(
            name='Target',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('target', models.TextField(max_length=60)),
            ],
        ),
        migrations.CreateModel(
            name='Faceauth',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('train_images', models.ImageField(blank=True, upload_to='train_images')),
                ('targets', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='grantaccess.target')),
            ],
        ),
    ]
