from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.db import transaction
from django.db.models import Q
from ninja import (
    Router,
    Form,
)
from django.shortcuts import get_object_or_404

from user_profile.schema.user_profile import (
    BaseUserProfileSchema,
    UserSignInForm,
    UserCreate,
)
from user_profile.models.user_profile import (
    UserProfile,
    Address,
)
from _webmart_api.auth import (
    generate_access_token,
    generate_refresh_token,
)


user_router = Router()


@user_router.post("sign-up")
def register_user(request, payload: UserCreate = Form()):
    data = payload.dict()
    address_data = data.pop("address", {})
    with transaction.atomic():
        new_user = User.objects.create_user(
            **data, username=f"{data['first_name']} {data['last_name']}"
        )
        new_user_profile = UserProfile.objects.create(user=new_user)
        Address.objects.create(user_profile=new_user_profile, **address_data)
        serialized_user = BaseUserProfileSchema.from_orm(new_user_profile)

        return {
            "user": serialized_user,
            "tokens": {
                "access_token": generate_access_token(data={"user": new_user}),
                "refresh_token": generate_refresh_token(data={"user": new_user}),
            },
        }


@user_router.post("sign-in", response={200: dict, 404: str})
def sign_in_user(request, payload: UserSignInForm = Form()):
    data = request.POST.copy()
    user_obj = User.objects.filter(
        Q(username=data["username"]) | Q(email__iexact=data["email"])
    ).first()
    user = authenticate(username=user_obj.username, password=data["password"])
    if user:
        user_profile = UserProfile.objects.filter(user=user).first()
        serialized_user = BaseUserProfileSchema.from_orm(user_profile)
        return 200, {
            "user": serialized_user,
            "tokens": {
                "access_token": generate_access_token(data={"user": user}),
                "refresh_token": generate_refresh_token(data={"user": user}),
            },
        }
    return 404, "Not found"


@user_router.post("sign-out")
def sign_out_user(request):
    # Temporary. Might have to do some operations on the tokens
    return 200


@user_router.get("user-profiles", response=list[BaseUserProfileSchema])
def get_user_profiles(request):
    return UserProfile.objects.all()


@user_router.get("get/{id}", response=BaseUserProfileSchema)
def get_user(request, id: int):
    return get_object_or_404(UserProfile, id=id)
