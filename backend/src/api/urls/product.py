from django.urls import path
from views.product import *

urlpatterns = [
    path('simple-item/', SimpleProductView.as_view()),
]