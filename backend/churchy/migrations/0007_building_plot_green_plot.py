# Generated by Django 4.0.5 on 2022-08-04 08:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('churchy', '0006_alter_building_coordinates'),
    ]

    operations = [
        migrations.AddField(
            model_name='building',
            name='plot',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='churchy.plot'),
        ),
        migrations.AddField(
            model_name='green',
            name='plot',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='churchy.plot'),
        ),
    ]
