from ninja import ModelSchema, Schema
from user_profile.models import *
from django.contrib.auth.models import User

from webmart_api.utils import generate_schema

#class BaseUserSchema(ModelSchema):
#    pass
#class BaseUserProfileSchema(ModelSchema):
#    class Config:
#        model = UserProfile
#        model_fields = []

#UserCreate = generate_schema(
#    User,
#    fields = ["first_name", "email", "last_name", "password" ],
#    custom = [
#        ("city", str, str),
#        ("province", str, str),
#        ("contact_number", str, str),
#        ("street", str, str),
#        ("zip_code", str, str)
#    ]
#)