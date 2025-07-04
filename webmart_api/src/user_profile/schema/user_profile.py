from ninja import Schema, ModelSchema, Field
from typing import Optional

from user_profile.models.user_profile import UserProfile
from django.contrib.auth.models import User
from user_profile.schema.address import (
    BaseAddressSchema,
    AddressCreate,
)


class BaseUserSchema(ModelSchema):
    class Meta:
        model = User
        fields = ["first_name", "email", "last_name"]


class BaseUserProfileSchema(ModelSchema):
    address: Optional[list[BaseAddressSchema]] = Field(default=[], alias="address_list")
    user: BaseUserSchema
    avatar_data: Optional[dict]
    avatar_url: Optional[str]
    full_name: str

    class Meta:
        model = UserProfile
        fields = "__all__"


class UserCreate(Schema):
    first_name: str
    email: str
    last_name: str
    password: str
    address: AddressCreate


class UserSignInForm(Schema):
    email: str
    username: Optional[str] = None
    password: str
