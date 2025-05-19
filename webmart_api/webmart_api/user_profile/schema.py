from ninja import ModelSchema, Schema
from webmart_models.user_profile.models import *
from django.contrib.auth.models import User

from webmart_api.utils import generate_schema

class BaseUserSchema(ModelSchema):
    pass
class BaseUserProfileSchema(ModelSchema):
    class Config:
        model = UserProfile
        model_fields = []

UserCreate = generate_schema(
    User,
    fields = ["first_name", "email", "last_name", "password" ],
    custom = [
        ("city", str),
        ("province", str),
        ("contact_number", str),
        ("street", str),
        ("zip_code", str)
    ]
)