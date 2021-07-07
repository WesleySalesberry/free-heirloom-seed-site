from rest_framework import serializers
from .models import OrderModel, OrderedItemsModel
from seeds.models import SeedModel

from seeds.serializer import SeedSerializer


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderModel
        fields = '__all__'


class OrderedItemSerializer(serializers.ModelSerializer):
    order = OrderSerializer(read_only=True)
    seed = SeedSerializer(read_only=True)

    class Meta:
        model = OrderedItemsModel
        fields = ['order', 'seed']
