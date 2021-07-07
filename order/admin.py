from django.contrib import admin
from .models import OrderModel, OrderedItemsModel

admin.site.register(OrderModel)
admin.site.register(OrderedItemsModel)
