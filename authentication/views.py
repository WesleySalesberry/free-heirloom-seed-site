from rest_framework.response import Response

from rest_framework.views import APIView
from .serializer import UserSerializer
from shipping.serializers import ShippingSerializer

from .models import CustomerModel
from shipping.models import ShippingModel

from rest_framework.exceptions import AuthenticationFailed
import jwt
import datetime
import os


class Register(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):

    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        customer = CustomerModel.objects.filter(email=email).first()

        if customer is None:
            raise AuthenticationFailed('No User Found With These Credentals')

        if not customer.check_password(password):
            raise AuthenticationFailed('No User Found With These Credentals')

        data = {
            'id': customer.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(data, os.getenv('SECRET_KEY'),
                           algorithm='HS256')

        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True)

        return response


class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated')
        try:
            data = jwt.decode(token, os.getenv(
                'SECRET_KEY'), algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')

        user = CustomerModel.objects.get(id=data['id'])

        user_serializer = UserSerializer(user, many=False)

        return Response(user_serializer.data)
