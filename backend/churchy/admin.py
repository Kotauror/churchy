from django.contrib import admin

from .models import PlaceOfPrayer

class PlaceOfPrayerAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')

# Register your models here.

admin.site.register(PlaceOfPrayer, PlaceOfPrayerAdmin)