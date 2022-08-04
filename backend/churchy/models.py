from django.db import models
from django.contrib.postgres.fields import ArrayField

class Religion(models.TextChoices):
  ROMAN_CATHOLIC = 'RO', 'RomanCatholic'
  ORTHODOX = 'OR', 'Orthodox'
  JUDAISM = 'JU', 'Judaism'
  OTHER = 'OT', 'Other'

class Accesibility(models.TextChoices):
  UNRESTRICTED = 'UR', 'Unrestricted'
  SOME_RESTRICTIONS = 'SR', 'SomeRestrictions'
  NO_ACCESS = 'NA', 'NoAccess'

class Plot(models.Model):
  name = models.CharField(max_length=120)
  address = models.TextField()
  description = models.TextField()
  owner = models.TextField() 
  religion = models.CharField(max_length = 2, choices=Religion.choices)
  visitors_access = models.CharField(max_length = 2, choices=Accesibility.choices)
  visitors_access_details = models.TextField()
  coordinates = ArrayField(ArrayField(models.FloatField(max_length = 500)))

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