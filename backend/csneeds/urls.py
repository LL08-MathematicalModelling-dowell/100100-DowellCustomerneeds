from django.urls import path
from .views import QuestionOne, QuestionTwo, QuestionThree, TagView

urlpatterns = [
    path('api/QuestionOne/', QuestionOne.as_view()),
    path('api/QuestionTwo/', QuestionTwo.as_view()),
    path('api/QuestionThree/', QuestionThree.as_view()),
    path('api/tags/', TagView.as_view()),
]
