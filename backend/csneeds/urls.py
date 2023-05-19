from django.urls import path
from .views import QuestionOne, QuestionTwo, QuestionThree

urlpatterns = [
    path('q1/', QuestionOne.as_view(), name='q1'),
    path('q2/', QuestionTwo.as_view(), name='q2'),
    path('q3/', QuestionThree.as_view(), name='q3'),
]
