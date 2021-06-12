from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from .serializer import UserSerializer
from shipping.serializers import ShippingSerializer

from .models import CustomerModel
from shipping.models import ShippingModel

from rest_framework.exceptions import AuthenticationFailed

from .utils import generate_access_token, generate_refresh_token


@api_view(['POST'])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def login_view(request):

    form = request.data
    email = form['email']
    password = form['password']

    if email == "":
        raise AuthenticationFailed('Email Can not be blank')

    if password == "":
        raise AuthenticationFailed('Password can not be blank')

    customer = CustomerModel.objects.filter(email=email).first()
    customer_serializer = UserSerializer(customer, many=False)

    if not customer.check_password(password):
        raise AuthenticationFailed('No User Found With These Credentals')

    access_token = generate_access_token(customer)
    refresh_token = generate_refresh_token(customer)

    response = Response()

    response.set_cookie(
        key='refresh_token', value=refresh_token, httponly=True)

    response.data = {
        'token': access_token,
        'customer': customer_serializer.data
    }

    return response


@api_view(['POST'])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def register_view(request):
    customer = CustomerModel.objects.filter(email=request.data['email'])
    if customer.exists():
        raise AuthenticationFailed('User already exist')

    new_customer = CustomerModel.objects.create_user(
        first_name=request.data['first_name'],
        last_name=request.data['last_name'],
        email=request.data['email'],
        password=request.data['password'],
    )

    new_customer_serializer = UserSerializer(new_customer, many=False)

    context = {
        'customer': new_customer_serializer.data
    }

    return Response(context)


@api_view(['GET'])
def get_user(request):
    customer = CustomerModel.objects.filter(first_name=request.user).first()
    try:
        address = ShippingModel.objects.get(addressee=customer.id)
        shipping_serializer = ShippingSerializer(address, many=False).data
    except ShippingModel.DoesNotExist:
        shipping_serializer = {
            "data": "No Address"
        }

    customer_serializer = UserSerializer(customer, many=False).data

    context = {
        "customer": customer_serializer,
        "shipping": shipping_serializer
    }
    return Response(context)
