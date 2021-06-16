from rest_framework import serializers

from .models import CustomerModel


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomerModel
        fields = ['id', 'first_name', 'last_name',
                  'email', 'password', 'is_admin']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        """Hash The Password"""
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
