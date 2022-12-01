from django.contrib import admin

from .models import Plot, Building, Green, Image, ImageToProperty

class PlotAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')

class BuildingAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')

class GreenAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')

class ImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'author', 'source', 'details', 'aerial')

class ImageToPropertyAdmin(admin.ModelAdmin):
    list_display = ('image', 'plot', 'green')
 

admin.site.register(Building, BuildingAdmin)
admin.site.register(Plot, PlotAdmin)
admin.site.register(Green, GreenAdmin)
admin.site.register(Image, ImageAdmin)
admin.site.register(ImageToProperty, ImageToPropertyAdmin)