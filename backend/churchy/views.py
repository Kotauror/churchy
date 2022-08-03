from django.shortcuts import render
from rest_framework import viewsets
from .serializers import PlotSerializer, BuildingSerializer, GreenSerializer
from .models import Plot, Building, Green

class PlotView(viewsets.ModelViewSet):
    serializer_class = PlotSerializer
    queryset = Plot.objects.all()

class BuildingView(viewsets.ModelViewSet):
    serializer_class = BuildingSerializer
    queryset = Building.objects.all()

class GreenView(viewsets.ModelViewSet):
    serializer_class = GreenSerializer
    queryset = Green.objects.all()