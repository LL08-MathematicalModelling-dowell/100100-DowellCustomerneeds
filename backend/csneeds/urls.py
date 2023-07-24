from django.urls import path
from .views import QuestionOne, QuestionTwo, QuestionThree

urlpatterns = [
    path('QuestionOne/', QuestionOne.as_view()),
    path('QuestionTwo/', QuestionTwo.as_view()),
    path('QuestionThree/', QuestionThree.as_view()),
]
