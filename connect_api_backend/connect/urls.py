from django.urls import path
from .views import ConnectDataView, ConnectDataTwoView, ConnectDataThreeView

urlpatterns = [
    path('api/spreadsheetOne/', ConnectDataView.as_view()),
    path('api/spreadsheetTwo/', ConnectDataTwoView.as_view()),
    path('api/spreadsheetThree/', ConnectDataThreeView.as_view()),
]
