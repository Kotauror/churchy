from django.shortcuts import render
from rest_framework import viewsets, mixins
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

class ImageView(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    def list(self, request):
        property_id = request.GET['id']
        property_type = request.GET['property']
        print(property_id, property_type)

        ## if property_type is green, get all images with green_id that match property_id
        ## if property_type is plot, get all images with property_id that match property_id
 
        return "ppp"