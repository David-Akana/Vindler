# Generated by Django 3.1.1 on 2020-10-27 21:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('grantaccess', '0012_faceauth_target'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Faceauth',
        ),
        migrations.DeleteModel(
            name='Target',
        ),
    ]
