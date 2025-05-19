from ninja import ModelSchema, Schema
from webmart_models.user_profile.models import *

class BaseUserSchema(ModelSchema):
    pass
class BaseUserProfileSchema(ModelSchema):
    class Config:
        model = UserProfile
        model_fields = []