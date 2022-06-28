from django.db import models
from django.contrib.postgres.fields import ArrayField

class PlaceOfPrayer(models.Model):
  class Religion(models.TextChoices):
    ROMAN_CATHOLIC = 'RO', 'RomanCatholic'
    ORTHODOX = 'OR', 'Orthodox'
    JUDAISM = 'JU', 'Judaism'
    OTHER = 'OT', 'Other'

  name = models.CharField(max_length=120)
  address = models.TextField()
  description = models.TextField()
  religion = models.CharField(max_length = 2, choices=Religion.choices)
  open_for_prayer = models.BooleanField()
  open_for_visitors = models.BooleanField()
  closed = models.BooleanField() 
  coordinates = ArrayField(ArrayField(models.CharField(max_length = 200)))

  def _str_(self):
      return self.name
