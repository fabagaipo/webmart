from ninja import Router
from product.models import *
from webmart_api.product.schema import *
from webmart_api.utils import *


product_router = Router()


@product_router.get('', response=list[ProductOut])
def get_products(request, removed: bool = False):
    print(removed,bool(removed) )
    return Product.objects.filter(removed=bool(removed))




@product_router.post('/create', response=ProductOut)
def create_product(request, payload: ProductIn):

    new_product = Product.objects.create(**payload.dict())
    return new_product







