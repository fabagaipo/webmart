from ninja import Schema, ModelSchema, Field
from typing import Optional
from pydantic import computed_field

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

    @computed_field
    def full_name(self) -> str:
        return f"{self.first_name} {self.last_name}"


class BaseUserProfileSchema(ModelSchema):
    address: Optional[list[BaseAddressSchema]] = Field(default=[], alias="address_list")
    user: BaseUserSchema

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
