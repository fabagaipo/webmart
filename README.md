# WebMart

## Setup local development

### Prerequisite 
- Docker

Start containers after building the images
```
docker compose up --build
```
On another terminal session
```
docker compose exec webmart_api bash
```
Run
```
python manage.py migrate
```
