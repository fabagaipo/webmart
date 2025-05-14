from rest_framework.views import APIView
from rest_framework.response import Response
from src.models.product import *
from serializers.product import class SimpleProductSerializer

class SimpleProductView(APIView):
    def get(self, request):
        items = Product.objects.all()
        serializer = SimpleProductSerializer(items, many=True)
        return Response(serializer.data)

    #def post(self, request):
    #    serializer = ItemSerializer(data=request.data)
    #    if serializer.is_valid():
    #        serializer.save()
    #        return Response(serializer.data, status=201)
    #    return Response(serializer.errors, status=400)