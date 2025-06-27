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

Frontend runs at port [4000](http://localhost:4000/)
Backend runs at port [8000](http://localhost:8000/webmart/docs)
