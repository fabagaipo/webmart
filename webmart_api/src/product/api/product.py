from ninja import Router, Query, Body
from ninja.responses import Response
from typing import List, Optional
from django.shortcuts import get_object_or_404
from django.db.models import Q
from django.db import transaction

from _webmart_api.auth import WebMartAuth
from product.models.product import Product
from ninja.orm import create_schema
from category.models.category import Category

product_router = Router()


@product_router.get("")
def get_products(request, name: Optional[str] = Query(None)):
    try:
        CATEGORY_SCHEMA = create_schema(Category, fields=["title"])
        PRODUCT_SCHEMA = create_schema(
            Product,
            fields=["id", "name", "price", "image_data"],
            custom_fields=[("category", List[CATEGORY_SCHEMA], None)],
        )

        filters = Q()

        for filter in [name]:
            if filter is not None:
                filters &= Q(name=name)

        products = Product.objects.filter(filters)

        response_data = {
            "products": [PRODUCT_SCHEMA.from_orm(product) for product in products]
        }
        return Response(response_data, status=200)
    except Exception as e:
        return Response({"message": str(e)}, status=500)


@product_router.get("get/{product_id}")
def get_product_details(request, product_id: int = Query()):
    try:
        CATEGORY_SCHEMA = create_schema(Category, fields=["title"])
        PRODUCT_SCHEMA = create_schema(
            Product,
            fields=["id", "name", "price", "image_data"],
            custom_fields=[("category", List[CATEGORY_SCHEMA], None)],
        )

        product = get_object_or_404(Product, id=product_id)

        return Response({"product": PRODUCT_SCHEMA.from_orm(product)}, 200)
    except Product.DoesNotExist as e:
        return Response({"message": str(e)}, status=500)
    except Exception as e:
        return Response({"message": str(e)}, status=500)


@product_router.post("create", auth=WebMartAuth())
def create_product(request, payload: dict = Body()):
    try:
        if Product.objects.filter(name=payload.get("name")).exists():
            raise Exception("Product already exists.")
        with transaction.atomic():
            CATEGORY_SCHEMA = create_schema(Category, fields=["title"])
            PRODUCT_SCHEMA = create_schema(
                Product,
                fields=["id", "name", "price", "image_data"],
                custom_fields=[("category", List[CATEGORY_SCHEMA], None)],
            )
            new_product = Product.objects.create(**payload)
            return Response({"product": PRODUCT_SCHEMA.from_orm(new_product)}, 200)
    except Exception as e:
        return Response({"message": str(e)}, 500)


@product_router.delete("delete/{product_id}")
def delete_product(request, product_id: int = Query()):
    try:
        with transaction.atomic():
            product = get_object_or_404(Product, product_id)
            product.delete()
        return Response({"message": "Product deleted."}, 200)
    except Exception as e:
        return Response({"message": str(e)}, 500)
