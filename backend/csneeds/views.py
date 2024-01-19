from rest_framework.views import APIView
from rest_framework.response import Response
from .customer_needs_manager import fetch_q1_data, fetch_q2_data, fetch_q3_data, fetch_tags, get_closeset_sentences


class QuestionOne(APIView):
    def get(self, request):
        data = fetch_q1_data()['data']
        return Response(data)


class QuestionTwo(APIView):
    def get(self, request):
        data = fetch_q2_data()['data']

        return Response(data)


class QuestionThree(APIView):
    def get(self, request):
        data = fetch_q3_data()['data']
        return Response(data)


class TagView(APIView):
    def get(self, request):
        data = fetch_tags()['data']
        return Response(data)

class GetClosestSentences(APIView):
    def post(self, request):
        final_score = request.data.get("final_score")
        return Response(get_closeset_sentences(final_score))