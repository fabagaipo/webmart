from product.models import *
from ninja import Schema, ModelSchema
from datetime import datetime
from typing import *
from typing import *

from webmart_api.utils import generate_schema

#class BaseProductSchema(ModelSchema):
#    class Config:
#        model = Product
#        model_fields = "__all__"

#class ProductOut(Schema):
#    name: str
#    description: Optional[str]
#    date_added: datetime
#    date_update: datetime = None
#    removed: bool

class CategorySimpleOut(Schema):
    title: str


ProductIn = generate_schema(
    Product,
    "ProductIn",
    fields=["name", "description"],
    optional=["category"]
)

ProductOut = generate_schema(
    Product,
    "ProductOut",
    fields=["name", "description", "removed"],
    custom=[
        ("category", List[CategorySimpleOut], None)
    ]
)