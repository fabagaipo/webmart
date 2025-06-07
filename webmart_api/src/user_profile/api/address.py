from ninja import (
    Router,
)
from _webmart_api.auth import WebMartAuth

address_router = Router(auth=WebMartAuth())

@address_router.post("add-address")
def add_address(request, payload):
    return 200

@address_router.get("user-addresses")
def get_user_addresses(request):
    return 200

@address_router.put("edit-address")
def edit_user_address(request, payload):
    return 200