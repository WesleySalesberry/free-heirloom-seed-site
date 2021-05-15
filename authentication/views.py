from rest_framework.response import Response

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializer import UserSerializer, UserSerializerWithToken

from django.contrib.auth.models import User

from django.contrib.auth.hashers import make_password

from rest_framework import status

from django.utils.translation import ugettext_lazy as _


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    default_error_messages = {
        'no_active_account': _('Email or Password is incorrect!')
    }

    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data

        for key, value in serializer.items():
            data[key] = value

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@ api_view(['POST'])
def register_user(request):
    user_data = request.data

    try:
        new_user = User.objects.create_user(
            first_name=user_data['name'],
            username=user_data['email'],
            email=user_data['email'],
            password=make_password(user_data['password']),
        )
        serializer = UserSerializerWithToken(new_user, many=False)
        return Response(serializer.data)

    except:
        message = {'message': 'These credentials are already in use.'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user(request):
    user = request.user
    updated_data = request.data
    serializer = UserSerializer(user, many=False)

    if updated_data['name'] != "":
        user.first_name = updated_data['name']

    if updated_data['email'] != "":
        user.username = updated_data['email']
        user.email = updated_data['email']

    if updated_data['password'] != "":
        user.password = updated_data['password']

    user.save()

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
# @permission_classes([IsAdminUser])
def all_users(request):
    users = User.objects.all()
    serialiers = UserSerializer(users, many=True)

    return Response(serialiers.data)
