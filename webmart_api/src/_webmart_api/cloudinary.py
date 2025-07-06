# https://cloudinary.com/documentation/django_integration
import cloudinary
import cloudinary.uploader
from _webmart_api.env import env

cloudinary.config(
    cloud_name=env("CLOUDINARY_CLOUD_NAME"),
    api_key=env("CLOUDINARY_API_KEY"),
    api_secret=env("CLOUDINARY_SECRET_KEY"),
)


def delete_asset(public_id):
    try:
        cloudinary.uploader.destroy(public_id)
    except Exception as e:
        raise e
