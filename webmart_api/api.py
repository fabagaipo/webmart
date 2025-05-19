#from django.urls import path
from webmart_api.product.product import product_router

from ninja import NinjaAPI

webmart = NinjaAPI()

webmart.add_router("products/", product_router)