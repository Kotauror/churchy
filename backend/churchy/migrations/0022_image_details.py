# Generated by Django 4.0.5 on 2022-11-28 10:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('churchy', '0021_alter_imagetoproperty_green_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='image',
            name='details',
            field=models.TextField(blank=True, null=True),
        ),
    ]
