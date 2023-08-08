from django.urls import path
from . import views

urlpatterns = [
    # path('api/classicData/', views.submit_classic_data),
    path('api/classicData/', views.classic_data_view, name='classic_data_view'),
]
