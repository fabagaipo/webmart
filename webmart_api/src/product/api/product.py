from ninja import *
from typing import *
from django.shortcuts import get_object_or_404

from product.models.product import *
from product.schema.product import *
from _webmart_api.utils import *


product_router = Router()


@product_router.get('', response={200: list[ProductOut], 404: None})
def get_products(request, queries: Query[ProductsFilterSchema]):
    return 200, Product.objects.filter(**queries.dict())

@product_router.get('get/{product_id}', response=FullProductOut)
def get_product_details(request, product_id: int):
    return get_object_or_404(Product, id=product_id)

@product_router.post('create', response=ProductOut)
def create_product(request, payload: ProductCreate=Form()):
    data = payload.dict().copy()
    data.pop("category", None)
    new_product = Product.objects.create(**data)
    return new_product

@product_router.delete('delete/{product_id}')
def delete_product(request, product_id: int):
    print(product_id)
    return "Deleted"







