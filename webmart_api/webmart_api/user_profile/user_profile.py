from django.contrib.auth.models import User
from django.db import transaction
from ninja import *

from webmart_api.user_profile.schema import *


user_router = Router()

#@user_router.post('sign-up')
#def get_users(request, payload: UserCreate=Form()):
#    with transaction.atomic():
#        pass