# Generated by Django 4.0.5 on 2022-08-15 18:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('churchy', '0009_plot_owneership_type'),
    ]

    operations = [
        migrations.RenameField(
            model_name='plot',
            old_name='owneership_type',
            new_name='ownership_model',
        ),
    ]