from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.db import transaction
from django.db.models import Q
from ninja import *
from django.shortcuts import get_object_or_404

from webmart_api.user_profile.schema import *
from user_profile.models import *


user_router = Router()

@user_router.post('sign-up')
def register_user(request, payload: UserCreate=Form()):
    data = payload.dict().copy()
    address_data = data.pop("address", {})
    with transaction.atomic():
        new_user = User.objects.create_user(
            **data,
            username=f'{data["first_name"]} {data["last_name"]}'
        )
        new_user_profile = UserProfile.objects.create(user=new_user)
        Address.objects.create(
            user_profile = new_user_profile,
            **address_data
        )

@user_router.post('sign-in')
def sign_in_user(request, payload: UserSignInForm=Form()):
    data = payload.dict().copy()
    user_obj = get_object_or_404(User, Q(username=data["username"]) | Q(email__iexact=data["email"]))
    user = authenticate(user=user_obj, password=data["password"])
    print(user)
    return

@user_router.get('user-profiles', response=list[BaseUserProfileSchema])
def get_user_profiles(request):
    return UserProfile.objects.all()

@user_router.get('get/{id}', response=BaseUserProfileSchema)
def get_user(request, id: int):
    return get_object_or_404(UserProfile, id=id)