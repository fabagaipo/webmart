from ninja import (
    ModelSchema,
)
from user_profile.models.user_profile import (
    Address,
)


class BaseAddressSchema(ModelSchema):
    class Meta:
        model = Address
        fields = "__all__"
