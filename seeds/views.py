from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .models import SeedModel

from .serializer import SeedSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def get_seeds(request):
    seeds = SeedModel.objects.filter(in_stock=True)
    serializer = SeedSerializer(seeds, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_seed(request, slug):
    seeds = SeedModel.objects.get(slug=slug)
    serializer = SeedSerializer(seeds, many=False)
    return Response(serializer.data)
