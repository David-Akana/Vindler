# Generated by Django 3.1.3 on 2021-01-08 00:07

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('vindler', '0021_auto_20210108_0103'),
    ]

    operations = [
        migrations.CreateModel(
            name='VindlesProfilePicture',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(default='default.jpg', upload_to='profile_pictures')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Vindles',
            fields=[
                ('vindlesprofilepicture_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='vindler.vindlesprofilepicture')),
                ('name', models.CharField(max_length=30)),
                ('post', models.TextField(max_length=300)),
                ('time_posted', models.DateTimeField(auto_now_add=True)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='vindles', to=settings.AUTH_USER_MODEL)),
            ],
            bases=('vindler.vindlesprofilepicture',),
        ),
    ]
