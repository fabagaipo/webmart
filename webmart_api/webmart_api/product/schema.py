from ninja import Schema
from typing import *
from pydantic import Field

from product.models import *
from webmart_api.utils import generate_schema
from webmart_api.baseschema import CustomFilterSchema

# PATH AND QUERY PARAMETERS SCHEMA
class ProductsFilterSchema(Schema, CustomFilterSchema):
    name__icontains: str | None = Field(None, alias="search")
    stores: int | None = Field(None, alias="store_id")
    removed: bool = False



# REQUEST AND RESPONSE SCHEMA
class CategorySimpleOut(Schema):
    id: int
    title: str


ProductCreate = generate_schema(
    Product,
    "ProductIn",
    fields=["name", "description", "category"],
    optional=["category"]
)

ProductOut = generate_schema(
    Product,
    "ProductOut",
    fields=["id", "name", "description", "removed", "price"],
    custom=[
        ("category", List[CategorySimpleOut], None)
    ]
)

FullProductOut = generate_schema(
    Product,
    "FullProductOut",
    custom=[
        ("category", List[CategorySimpleOut], None)
    ]
)