from ninja import *
from typing import *

from django.shortcuts import get_object_or_404
from product.models import *
from webmart_api.product.schema import *
from webmart_api.utils import *


product_router = Router()


@product_router.get('', response={200: list[ProductOut], 404: None})
def get_products(request, queries: Query[ProductsFilterSchema]):
    return 200, Product.objects.filter(**queries.dict())

@product_router.get('details/{product_id}', response=FullProductOut)
def get_product_details(request, product_id: int):
    return get_object_or_404(Product, id=product_id)

@product_router.post('create', response=ProductOut)
def create_product(request, payload: ProductCreate=Form()):
    new_product = Product.objects.create(**payload.dict())
    return new_product

@product_router.delete('delete/{product_id}')
def delete_product(request, product_id: int):
    print(product_id)
    return "Deleted"







