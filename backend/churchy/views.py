from django.shortcuts import render
from rest_framework import viewsets, mixins
from rest_framework.response import Response
from .serializers import PlotSerializer, BuildingSerializer, GreenSerializer, ImageSerializer
from .models import Plot, Building, Green, ImageToProperty
from django.db.models import Q

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
        images_to_propertys = ImageToProperty.objects.all().select_related("image")
        images = []
        for image_to_property in images_to_propertys:
            if property_type == 'green':
                    if (image_to_property.green != None) and (int(image_to_property.green.id) == int(property_id)):
                        images.append(image_to_property.image)
            else:
                    if (image_to_property.plot != None) and (int(image_to_property.plot.id) == int(property_id)):
                        images.append(image_to_property.image)

        serializer = ImageSerializer(images, many=True)

        return Response(serializer.data)