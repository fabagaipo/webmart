from ninja import (
    Schema,
    ModelSchema,
)
from typing import (
    Optional
)
from user_profile.models.user_profile import (
    Address,
)

class BaseAddressSchema(ModelSchema):
    class Meta:
        model = Address
        fields = "__all__"


class AddressCreate(Schema):
    city: str
    province: str
    zip_code: str
    phone_number: str
    details: Optional[str] = None