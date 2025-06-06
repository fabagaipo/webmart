from pydantic import BaseModel
from src._webmart_api.utils import removeNoneValues

class CustomFilterSchema(BaseModel):
    """
    This is an inheritable class for Path and Query parameters schema classes
    that removes None values so that the endpoints can simply pass
    the dictionary without having to manually remove the None values

    Example
     @product_router.get('', response={200: list[ProductOut], 404: None})
    def get_products(request, queries: Query[ProductsFilterSchema]):
        filters = #removal of None values
        return 200, Product.objects.filter(**filters)
    
        vs

    @product_router.get('', response={200: list[ProductOut], 404: None})
    def get_products(request, queries: Query[ProductsFilterSchema]):
        return 200, Product.objects.filter(**queries.dict())

    Ref:
        https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_dump
        https://django-ninja.dev/guides/input/query-params/
    """
    def model_dump(self, *args, **kwargs):
        return removeNoneValues(super().model_dump(*args, **kwargs))