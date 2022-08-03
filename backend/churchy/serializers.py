from rest_framework import serializers
from .models import Plot, Building, Green

class PlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plot
        fields = ('id', 'name', 'address', 'description', 'owner', 'religion', 'visitors_access', 'visitors_access_details', 'coordinates')

class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = ('id', 'name', 'purpose', 'address', 'description', 'owner', 'religion', 'visitors_access', 'visitors_access_details', 'praying_access', 'coordinates')

class GreenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Green
        fields = ('id', 'name', 'green_type', 'address', 'description', 'owner', 'religion', 'visitors_access', 'visitors_access_details', 'coordinates')