from rest_framework.response import Response

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializer import UserSerializer, UserSerializerWithToken

from django.contrib.auth.models import User

from django.contrib.auth.hashers import make_password

from rest_framework import status


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data

        for key, value in serializer.items():
            data[key] = value

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
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
        message = {'message': 'Member with this email already exist'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
# @permission_classes([IsAdminUser])
def all_users(request):
    users = User.objects.all()
    serialiers = UserSerializer(users, many=True)

    return Response(serialiers.data)
