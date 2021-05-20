from rest_framework import serializers

from .models import CustomerModel
from rest_framework_simplejwt.tokens import RefreshToken


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


# class CustomerSerializer(serializers.ModelSerializer):
#     token = serializers.SerializerMethodField(read_only=True)

#     class Meta:
#         model = CustomerModel
#         fields = ['id', 'user_name', 'email',
#                   'first_name', "is_staff", "token"]
#         extra_kwargs = {'password': {'write_only': True}}

#     def create(self, validated_data):
#         password = validated_data.pop('password', None)
#         # as long as the fields are the same, we can just use this
#         instance = self.Meta.model(**validated_data)
#         if password is not None:
#             instance.set_password(password)
#         instance.save()
#         return instance

#     def get_token(self, obj):
#         token = RefreshToken.for_user(obj)
#         return str(token.access_token)


# class UserSerializer(serializers.ModelSerializer):
#     name = serializers.SerializerMethodField(read_only=True)
#     isAdmin = serializers.SerializerMethodField(read_only=True)

#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email', 'name', 'isAdmin']

#     def get_id(self, obj):
#         return obj.id

#     def get_isAdmin(self, obj):
#         return obj.is_staff

#     def get_name(self, obj):
#         name = obj.first_name

#         if name == '':
#             name = obj.email

#         return name


# class UserSerializerWithToken(UserSerializer):
#     token = serializers.SerializerMethodField(read_only=True)

#     class Meta:
#         model = User
#         fields = ['id', 'name', 'username', 'email', 'isAdmin', 'token']

    # def get_token(self, obj):
    #     token = RefreshToken.for_user(obj)
    #     return str(token.access_token)
