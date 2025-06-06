# from django.urls import path
from product.api.product import product_router
from user_profile.api.user_profile import user_router

from ninja import NinjaAPI

webmart = NinjaAPI()

webmart.add_router("products/", product_router)
webmart.add_router("user/", user_router)
