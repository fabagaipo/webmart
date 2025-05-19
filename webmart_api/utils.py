from ninja import Schema
from ninja.orm import create_schema
from typing import Optional
from django.db import models


def generate_schema(
    model = type[models.Model],
    name = str,
    fields: list[str] = [],
    depth: int = 0,
    exclude: Optional[list[str]] = None,
    optional: Optional[list[str]] = None,
    custom: Optional[list[tuple[str, str, any]]] = None,
):

    return create_schema(
        model,
        name=name,
        depth=depth,
        fields=fields,
        exclude=exclude,
        optional_fields=optional,
        custom_fields=custom
    )

"""
Ref: https://django-ninja.dev/guides/response/django-pydantic-create-schema/

def create_schema(
    model, # django model
    name = "", # name for the generated class, if empty model names is used
    depth = 0, # if > 0 schema will also be created for the nested ForeignKeys and Many2Many (with the provided depth of lookup)
    fields: list[str] = None, # if passed - ONLY these fields will added to schema
    exclude: list[str] = None, # if passed - these fields will be excluded from schema
    optional_fields: list[str] | str = None, # if passed - these fields will not be required on schema (use '__all__' to mark ALL fields required)
    custom_fields: list[tuple(str, Any, Any)] = None, # if passed - this will override default field types (or add new fields)
)
"""

def removeNoneValues(data: dict):
    return { key: value for key, value in data.items() if value}