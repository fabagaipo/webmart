#from django.urls import path
from webmart_api.product.product import product_router
from webmart_api.user_profile.user_profile import user_router

from ninja import NinjaAPI

webmart = NinjaAPI()

webmart.add_router("products/", product_router)
webmart.add_router("user/", user_router)