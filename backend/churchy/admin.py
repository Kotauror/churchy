from django.contrib import admin

from .models import Plot, Building, Green, Image

class PlotAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')

class BuildingAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')

class GreenAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')

class ImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'author', 'source')

admin.site.register(Building, BuildingAdmin)
admin.site.register(Plot, PlotAdmin)
admin.site.register(Green, GreenAdmin)
admin.site.register(Image, ImageAdmin)