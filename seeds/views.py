from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import SeedModel

from .serializer import SeedSerializer


@api_view(['GET'])
def get_seeds(request):
    seeds = SeedModel.objects.filter(in_stock=True)
    serializer = SeedSerializer(seeds, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_seed(request, slug):
    seeds = SeedModel.objects.get(slug=slug)
    serializer = SeedSerializer(seeds, many=False)
    return Response(serializer.data)
