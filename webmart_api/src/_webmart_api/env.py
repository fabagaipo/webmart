# https://django-environ.readthedocs.io/en/latest/quickstart.html
import environ

env = environ.Env(
    ACCESS_TOKEN_LIFETIME=(int, 2),
    ALLOWED_HOSTS=(list, ["127.0.0.1", "localhost"]),
    DATABASE_URL=(
        str,
        "postgresql://webmart_user:webmartpassword@webmart_db:5432/webmart",
    ),
    DEBUG=(bool, False),
    REFRESH_TOKEN_LIFETIME=(int, 15),
    SECRET_KEY=(
        str,
        "django-insecure-nl7(9q_gldr+i+2@a4wdq!f=*#8k77sxi$f-f7*(8r==beqzky",
    ),
)
