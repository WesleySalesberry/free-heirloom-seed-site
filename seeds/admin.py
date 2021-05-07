from django.contrib import admin
from .models import SeedModel


class SeedAdmin(admin.ModelAdmin):
    model = SeedModel
    list_display = ('name', 'seedID', 'countInStock', 'in_stock')
    list_display_links = ('name', 'seedID', 'countInStock', 'in_stock')


admin.site.register(SeedModel, SeedAdmin)
