from ninja import *
from django.db import models
from typing import *
from user_profile.models import *
from django.contrib.auth.models import User
from pydantic import *
from webmart_api.utils import generate_schema

class BaseUserSchema(ModelSchema):
    class Meta:
        model = User
        fields = ["first_name", "email", "last_name"]
    
    @computed_field
    def full_name(self) -> str:
        return f'{self.first_name} {self.last_name}'

class BaseAddressSchema(ModelSchema):
    class Meta:
        model = Address
        fields = "__all__"

class BaseUserProfileSchema(ModelSchema):
    address: Optional[list[BaseAddressSchema]] = Field(
        default = [],
        alias = "address_list"
    )
    user: BaseUserSchema
    class Meta:
        model = UserProfile
        fields = "__all__"
class AddressCreate(Schema):
    city: str
    province: str
    postal_code: str

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