from db.models.product import *
from tortoise.contrib.pydantic import pydantic_model_creator

Product_Pydantic = pydantic_model_creator(Product, name="Product")
ProductIn_Pydantic = pydantic_model_creator(Product, name="ProductIn", exclude_readonly=True)