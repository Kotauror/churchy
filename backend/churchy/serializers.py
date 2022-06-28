from rest_framework import serializers
from .models import PlaceOfPrayer

class PlaceOfPrayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaceOfPrayer
        fields = ('id', 'name', 'address', 'description', 'religion', 'open_for_prayer', 'open_for_visitors', 'closed', 'coordinates')