from django.db import models
from django.contrib.postgres.fields import ArrayField

class Religion(models.TextChoices):
  ROMAN_CATHOLIC = 'RO', 'RomanCatholic'
  ORTHODOX = 'OR', 'Orthodox'
  JUDAISM = 'JU', 'Judaism'
  OTHER = 'OT', 'Other'

class Accesibility(models.TextChoices):
  UNRESTRICTED = 'UR', 'Unrestricted'
  OPEN_DURING_DAYTIME = 'OD', 'OpenDuringDaytime'
  SPECIAL_ACCESS = 'SA', 'SpecialAccess'
  NO_ACCESS = 'NA', 'NoAccess'

class Ownership(models.TextChoices):
  KRK_PLACED_IN_POSSESSION = 'PP', 'KrakowPlacedInPossession'
  KRK_JOINED_OWNERSHIP = 'JO', 'KrakowJoinedOwnership'
  KRK_PERPETUAL_USE = 'PU', 'KrakowPerpetualUse'
  FISC = 'FI', 'Fisc'
  COUNTY_PLACED_IN_POSSESSION = 'CP', 'CountyPlacedInPossession'
  COUNTY_JOINED_OWNERSHIP = 'CO', 'CountyJoinedOwnership'
  COUNTY_PERPETUAL_USE = 'CU', 'CountyPerpetualUse'
  VOIVODESHIP = 'VO', 'Voivodeship'
  NATURAL_PERSON = 'NP', 'NaturalPerson'
  LEGAL_ENTITY = 'LE', 'LegalEntity'

class Plot(models.Model):
  name = models.CharField(max_length=120)
  address = models.TextField()
  description = models.TextField()
  owner = models.TextField() 
  religion = models.CharField(max_length = 2, choices=Religion.choices)
  visitors_access = models.CharField(max_length = 2, choices=Accesibility.choices)
  visitors_access_details = models.TextField()
  coordinates = ArrayField(ArrayField(models.FloatField(max_length = 500)))
  ownership_model = models.CharField(max_length = 2, choices=Ownership.choices)

  def _str_(self):
      return self.name

class Building(models.Model):
  class Purpose(models.TextChoices):
    PLACE_OF_PRAYER = 'PP', 'PlaceOfPrayer'
    CLOISTER = 'CL', 'Cloister'
    ADMINISTRATION = 'AD', 'Administration'
    OTHER = 'OT', 'Other'

  name = models.CharField(max_length=120)
  purpose = models.CharField(max_length = 2, choices=Purpose.choices) 
  address = models.TextField()
  description = models.TextField()
  owner = models.TextField() 
  religion = models.CharField(max_length = 2, choices=Religion.choices)
  visitors_access = models.CharField(max_length = 2, choices=Accesibility.choices)
  visitors_access_details = models.TextField()
  praying_access = models.BooleanField()
  coordinates = ArrayField(models.FloatField(max_length = 500))
  plot = models.ForeignKey(
    Plot, 
    on_delete=models.DO_NOTHING,
    null=True
  )

  def _str_(self):
    return self.name

class Green(models.Model):
  class GreenType(models.TextChoices):
    GARDEN = 'GD', 'Garden'
    PARK = 'PK', 'Park'
    MEADOW = 'MD', 'Meadow'
    SQUARE = 'SQ', 'Square'
    CEMETERY  = 'CT', 'Cemetery'

  name = models.CharField(max_length=120)
  green_type = models.CharField(max_length = 2, choices=GreenType.choices) 
  address = models.TextField()
  description = models.TextField()
  owner = models.TextField() 
  religion = models.CharField(max_length = 2, choices=Religion.choices)
  visitors_access = models.CharField(max_length = 2, choices=Accesibility.choices)
  visitors_access_details = models.TextField()
  coordinates = ArrayField(ArrayField(models.FloatField(max_length = 500)))
  plot = models.ForeignKey(
    Plot, 
    on_delete=models.DO_NOTHING,
    null=True
  )