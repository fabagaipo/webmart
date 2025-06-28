# WebMart

### 🐳 Development setup 

#### Prerequisite 
- Docker

#### Building the images and starting the containers
```
docker compose up --build
```
#### Run migrations and create superuser
```
docker compose exec webmart_api bash
```
```
python manage.py migrate
```
```
python manage.py createsuperuser
```
#### Additional setup
On your machine's terminal
```
sh addional_setup.sh
```
___
Frontend runs at port [4000](http://localhost:4000/) \
Backend runs at port [8000](http://localhost:8000/webmart/docs)
