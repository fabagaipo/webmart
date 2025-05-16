from db.models import *
from db.schema import *
from fastapi import HTTPException

from fastapi import APIRouter

router = APIRouter(
    prefix="/products",
    tags=["products"]
)


@router.get('', response_model=list[Product_Pydantic])
async def get_products():
    return await Product_Pydantic.from_queryset(Product.all())

@router.post('/create',
             response_model=Product_Pydantic,
             response_model_include={"name"}
             )
async def create_product(product: ProductIn_Pydantic): # type: ignore
    product_obj = await Product.create(**product.dict(exclude_unset=True))
    return await Product_Pydantic.from_tortoise_orm(product_obj)

@router.get('/{product_id}')
async def get_product(product_id: int):
    return await Product_Pydantic.from_queryset_single(Product.get(id=product_id))

@router.delete('/delete/{product_id}')
async def delete_product(product_id: int):
    product_obj = await Product.get_or_none(id=product_id)

    if not product_obj:
        raise HTTPException(status_code=404, detail="Product not found")

    return await product_obj.delete()
