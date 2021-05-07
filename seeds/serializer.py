from rest_framework import serializers
from .models import SeedModel


class SeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = SeedModel
        fields = '__all__'
