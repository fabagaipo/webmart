from src.models.product import *
from rest_framework import serializers


class SimpleProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'name',
            'price',
            'image'
        ]