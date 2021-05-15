from rest_framework import serializers

from .models import ShippingModel


class ShippingSerializer(serializers.ModelSerializer):

    class Meta:
        model = ShippingModel

        fields = '__all__'

    # def validate(self, data):
    #     for key, value in data.items():
    #         if value is None:
    #             raise serializers.ValidationError(
    #                 {'key': f'{key} can not be left blank'})
    #     return data
