# Generated by Django 4.0.5 on 2022-08-17 14:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('churchy', '0015_alter_building_visitors_access_details_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='plot',
            name='ownership_model',
            field=models.CharField(choices=[('PP', 'KrakowPlacedInPossession'), ('JO', 'KrakowJoinedOwnership'), ('PU', 'KrakowPerpetualUse'), ('FI', 'Fisc'), ('CP', 'CountyPlacedInPossession'), ('CO', 'CountyJoinedOwnership'), ('CU', 'CountyPerpetualUse'), ('VO', 'Voivodeship'), ('NP', 'NaturalPerson'), ('LE', 'LegalEntity'), ('NL', 'NaturalAndLegalPerson')], max_length=2),
        ),
    ]
