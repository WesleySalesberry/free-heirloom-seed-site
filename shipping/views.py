from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from django.views.decorators.csrf import ensure_csrf_cookie

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
def get_shipping(request):
    try:
        shippie = ShippingModel.objects.get(addressee=request.user.id)

    except ShippingModel.DoesNotExist:
        shippie = None

    if shippie:
        address = ShippingSerializer(shippie, many=False)
        return Response(address.data)
    else:
        message = {'message': "No address on record"}
        return Response(message)


@api_view(['POST'])
@ensure_csrf_cookie
def create_shipping(request):
    address = request.data

    try:
        shipping_address = ShippingModel.objects.create(
            addressee=request.user,
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
@ensure_csrf_cookie
def update_shipping(request):
    updated_data = request.data
    print(f'Address Data: {updated_data}')
    print(f'User ID: {request.user.id}')

    shipping = ShippingModel.objects.get(addressee_id=request.user.id)

    address_serializer = ShippingSerializer(shipping, many=False).data

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

    return Response(address_serializer)
