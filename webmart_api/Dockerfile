FROM python:3.12-slim-bullseye

WORKDIR /app

COPY requirements.txt /app

RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["python", "-u", "manage.py", "runserver", "0.0.0.0:8000"]

