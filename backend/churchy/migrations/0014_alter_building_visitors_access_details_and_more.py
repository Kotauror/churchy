# Generated by Django 4.0.5 on 2022-08-16 08:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('churchy', '0013_alter_building_visitors_access_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='building',
            name='visitors_access_details',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='green',
            name='visitors_access_details',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='plot',
            name='visitors_access_details',
            field=models.TextField(blank=True),
        ),
    ]