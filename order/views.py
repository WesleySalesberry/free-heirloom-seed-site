from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import OrderModel, OrderedItemsModel
from seeds.models import SeedModel
from .serializers import OrderSerializer, OrderedItemSerializer


@api_view(['POST'])
def create_order(request):
    user = request.user
    order = request.data

    my_order = OrderModel.objects.create(
        user=user,
        payment_method=order['payment_method'],
        confirmation=order['confirmation'],
        total_price=order['total_price'],
        is_paid=order['is_paid'],
        order_created=order['order_created'],
    )

    order_serializer = OrderSerializer(my_order, many=False).data

    return Response(order_serializer)


@api_view(['POST'])
def add_order(request):
    items = request.data['orderItems']['item']
    ordered = request.data['orderItems']['order']

    order = OrderModel.objects.get(id=ordered['id'])

    ordered_items = ''

    for elem in items:
        seed = SeedModel.objects.get(id=elem['id'])

        ordered_items = OrderedItemsModel.objects.create(
            user=request.user,
            order=order,
            seed=seed
        )

        if seed.countInStock > 0:
            seed.countInStock -= 1
            seed.save()
        else:
            message = {
                'success': 'false',
                'data': "Out of Stock"
            }
            return Response(message)

    return Response(ordered_items)


@api_view(['GET'])
def get_orders(request):
    orders = OrderedItemsModel.objects.filter(user_id=request.user.id)

    order_serializer = OrderedItemSerializer(orders, many=True).data

    return Response(order_serializer)
