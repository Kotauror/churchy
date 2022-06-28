from django.shortcuts import render
from rest_framework import viewsets
from .serializers import PlaceOfPrayerSerializer
from .models import PlaceOfPrayer

# Create your views here.

class PlaceOfPrayerView(viewsets.ModelViewSet):
    serializer_class = PlaceOfPrayerSerializer
    queryset = PlaceOfPrayer.objects.all()