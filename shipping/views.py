from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .serializers import ShippingSerializer
from .models import ShippingModel
from authentication.models import CustomerModel
from django.contrib.auth.models import User

from rest_framework import status
import jwt
import os


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def get_shipping(request):
    token = request.COOKIES.get('jwt')
    if not token:
        raise AuthenticationFailed('Unauthenticated')
    try:
        data = jwt.decode(token, os.getenv(
            'SECRET_KEY'), algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated')

    try:
        shippie = ShippingModel.objects.get(addressee_id=data['id'])

    except ShippingModel.DoesNotExist:
        shippie = None

    if shippie:
        address = ShippingSerializer(shippie, many=False)
        return Response(address.data)
    else:
        message = {'message': "No address on record"}
        return Response(message)


@api_view(['POST'])
def create_shipping(request):
    token = request.COOKIES.get('jwt')
    address = request.data
    if not token:
        raise AuthenticationFailed(
            'You need to be authenticated to access this')
    try:
        data = jwt.decode(token, os.getenv(
            'SECRET_KEY'), algorithms=['HS256'])

    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed(
            'You need to be authenticated to access this')

    try:
        customer = CustomerModel.objects.get(id=data['id'])
        shipping_address = ShippingModel.objects.create(
            addressee=customer,
            address=address['address'],
            city=address['city'],
            postal_code=address['postal_code'],
            state=address['state'],
            country=address['country']
        )

        serializer = ShippingSerializer(shipping_address, many=False)
        return Response(serializer.data)
    except:
        message = {'message': 'Field cannot be blank.'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_shipping(request):
    token = request.COOKIES.get('jwt')

    if not token:
        raise AuthenticationFailed(
            'You need to be authenticated to access this')
    try:
        data = jwt.decode(token, os.getenv(
            'SECRET_KEY'), algorithms=['HS256'])

    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed(
            'You need to be authenticated to access this')

    updated_data = request.data
    print(updated_data)
    shipping = ShippingModel.objects.get(addressee_id=data['id'])

    serializer = ShippingSerializer(shipping, many=False)

    if updated_data['address'] != "":
        shipping.address = updated_data['address']

    if updated_data['city'] != "":
        shipping.city = updated_data['city']

    if updated_data['state'] != "":
        shipping.state = updated_data['state']

    if updated_data['postal_code'] != "":
        shipping.postal_code = updated_data['postal_code']

    if updated_data['country'] != "":
        shipping.country = updated_data['country']

    shipping.save()

    return Response(serializer.data)
