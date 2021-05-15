from rest_framework.response import Response

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .serializers import ShippingSerializer
from .models import ShippingModel
from django.contrib.auth.models import User

from rest_framework import status


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_shipping(request):
    shippie = ShippingModel.objects.get(addressee=request.user)
    serializer = ShippingSerializer(shippie, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_shipping(request):
    data = request.data

    try:
        shipping_address = ShippingModel.objects.create(
            addressee=request.user,
            address=data['address'],
            city=data['city'],
            state=data['state'],
            postal_code=data['postal_code'],
            country=data['country']
        )
        serializer = ShippingSerializer(shipping_address, many=False)

        return Response(serializer.data)

    except:
        message = {'message': 'Field cannot be blank.'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_shipping(request):
    updated_data = request.data

    shipping = ShippingModel.objects.get(addressee=request.user)

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
