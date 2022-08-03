from django.contrib import admin

from .models import Plot, Building, Green

class PlotAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')

class BuildingAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')

class GreenAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')

admin.site.register(Building, BuildingAdmin)
admin.site.register(Plot, PlotAdmin)
admin.site.register(Green, GreenAdmin)