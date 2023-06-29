from django.urls import path
from .views import SpreadsheetView

urlpatterns = [
    path('api/spreadsheet/', SpreadsheetView.as_view())
]