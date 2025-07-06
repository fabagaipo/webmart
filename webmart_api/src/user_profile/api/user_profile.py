from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.db import transaction
from django.db.models import Q
from ninja.responses import Response
from ninja import Router, Body
from django.shortcuts import get_object_or_404

from user_profile.schema.user_profile import BaseUserProfileSchema
from user_profile.models.user_profile import (
    UserProfile,
    Address,
)
from _webmart_api.auth import (
    generate_access_token,
    generate_refresh_token,
)
from _webmart_api.auth import WebMartAuth
from _webmart_api.cloudinary import delete_asset


user_router = Router()


@user_router.post("sign-up")
def register_user(request, payload: dict = Body()):
    address_payload = payload.pop("address", {})
    try:
        with transaction.atomic():
            new_user = User.objects.create_user(
                **payload, username=f"{payload['first_name']} {payload['last_name']}"
            )
            address = Address.objects.create(**address_payload)
            new_user_profile = UserProfile.objects.create(user=new_user)
            new_user_profile.addresses.add(address)
            serialized_user = BaseUserProfileSchema.from_orm(new_user_profile)

            response_data = {
                "user_profile": serialized_user,
                "tokens": {
                    "access_token": generate_access_token(data={"user": new_user}),
                    "refresh_token": generate_refresh_token(data={"user": new_user}),
                },
            }
            return Response(response_data, status=200)
    except Exception as e:
        return Response({"message": str(e)}, status=500)


@user_router.post("sign-in")
def sign_in_user(request, payload: dict = Body()):
    user_obj = get_object_or_404(
        User, Q(username=payload["username"]) | Q(email__iexact=payload["email"])
    )
    user = authenticate(username=user_obj.username, password=payload["password"])
    user_profile = get_object_or_404(UserProfile, user=user)
    serialized_user = BaseUserProfileSchema.from_orm(user_profile)
    response_data = {
        "user_profile": serialized_user,
        "tokens": {
            "access_token": generate_access_token(data={"user": user}),
            "refresh_token": generate_refresh_token(data={"user": user}),
        },
    }
    return Response(response_data, status=200)


@user_router.post("sign-out")
def sign_out_user(request):
    # Temporary. Might have to do some operations on the tokens
    return Response({"message": "Successfully signed out."}, status=200)


@user_router.get("me", auth=WebMartAuth())
def get_user(request):
    user_profile = get_object_or_404(UserProfile, user=request.user_id)
    serialized_user = BaseUserProfileSchema.from_orm(user_profile)
    return Response({"user_profile": serialized_user}, status=200)


@user_router.put("update-avatar", auth=WebMartAuth())
def update_user_profile(request, payload: dict = Body()):
    try:
        with transaction.atomic():
            user_profile = UserProfile.objects.get(user=request.user)
            if user_profile.avatar_data is not None:
                delete_asset(user_profile.avatar_data.get("public_id"))
            user_profile.avatar_data = payload
            user_profile.save()
            return Response({"message": "Avatar updated."}, status=200)
    except Exception as e:
        return Response({"message": str(e)}, status=500)


@user_router.get("refresh-access")
def refresh_access_token(request):
    return {"access_token": generate_access_token(data={"user": request.user})}
