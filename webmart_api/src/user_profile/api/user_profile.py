from django.contrib.auth.models import User
import cloudinary.uploader
from django.contrib.auth import authenticate
from django.db import transaction
from django.db.models import Q
from ninja import Router, Form, Body
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
from _webmart_api.auth import WebMartAuth


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
            "data": serialized_user,
            "tokens": {
                "access_token": generate_access_token(data={"user": new_user}),
                "refresh_token": generate_refresh_token(data={"user": new_user}),
            },
        }


@user_router.post("sign-in", response={200: dict, 404: str})
def sign_in_user(request, payload: UserSignInForm = Form()):
    data = request.POST.copy()
    user_obj = get_object_or_404(
        User, Q(username=data["username"]) | Q(email__iexact=data["email"])
    )
    user = authenticate(username=user_obj.username, password=data["password"])
    user_profile = get_object_or_404(UserProfile, user=user)
    serialized_user = BaseUserProfileSchema.from_orm(user_profile)
    return 200, {
        "data": serialized_user,
        "tokens": {
            "access_token": generate_access_token(data={"user": user}),
            "refresh_token": generate_refresh_token(data={"user": user}),
        },
    }


@user_router.post("sign-out")
def sign_out_user(request):
    # Temporary. Might have to do some operations on the tokens
    return 200


@user_router.get("me", auth=WebMartAuth())
def get_user(request):
    user_profile = get_object_or_404(UserProfile, user=request.user_id)
    serialized_user = BaseUserProfileSchema.from_orm(user_profile)
    return serialized_user


@user_router.put("update-avatar", auth=WebMartAuth())
def update_user_profile(request, avatar_data: dict = Body()):
    user_profile = UserProfile.objects.get(user=request.user)

    if user_profile.avatar_data:
        cloudinary.uploader.destroy(user_profile.avatar_data.get("public_id"))

    user_profile.avatar_data = avatar_data
    user_profile.save()
    return 200


@user_router.get("refresh-access")
def refresh_access_token(request):
    return {"access_token": generate_access_token(data={"user": request.user})}
