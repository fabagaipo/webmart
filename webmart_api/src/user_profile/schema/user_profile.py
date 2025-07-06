from ninja import Schema, ModelSchema, Field
from typing import Optional

from user_profile.models.user_profile import UserProfile
from user_profile.schema.address import (
    BaseAddressSchema,
)


class BaseUserProfileSchema(ModelSchema):
    addresses: Optional[list[BaseAddressSchema]]
    avatar_url: Optional[str] = None
    email: str = Field(..., alias="user.email")
    full_name: str = Field(..., alias="user.get_full_name")
    username: str = Field(..., alias="user.username")

    class Meta:
        model = UserProfile
        exclude = ["avatar_data"]

    @staticmethod
    def resolve_avatar_url(obj):
        return obj.avatar_data.get("url")


class UserSignInForm(Schema):
    email: str
    username: Optional[str] = None
    password: str
