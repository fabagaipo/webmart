from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise
from api.routes import product

app = FastAPI()


app.include_router(product.router)

@app.get("/")
async def root():
    return {"message": "Hello World"}


register_tortoise(
    app,
    config={
        'connections': {
            'default': {
                'engine': 'tortoise.backends.asyncpg',
                'credentials': {
                    'host': 'localhost',
                    'port': '5432',
                    'password': 'yourpass',
                    'database': 'webmart',
                }
            }
        },
        'apps': {
            'models': {
                'models': ['db.models'],
                'default_connection': 'default',
            }
        }
    },
    generate_schemas=True,
)