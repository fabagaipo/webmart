from ninja import ModelSchema, Schema
from user_profile.models import *
from django.contrib.auth.models import User

from webmart_api.utils import generate_schema

#class BaseUserSchema(ModelSchema):
#    pass
#class BaseUserProfileSchema(ModelSchema):
#    class Meta:
#        model = UserProfile
#        exclude = ["id"]

class BaseAddressSchema(ModelSchema):
    class Meta:
        model = Address
        fields = "__all__"
        exclude = ["id", "user_profile"]
        fields_optional = ["details"]


class UserCreate(Schema):
    first_name: str
    email: str
    last_name: str
    address: BaseAddressSchema