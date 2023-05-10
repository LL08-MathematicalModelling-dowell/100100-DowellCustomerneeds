from rest_framework.views import APIView
from rest_framework.response import Response


class Q1View(APIView):
    def get(self, request):
        q1_data = [
            {
                "Item ID ": 10001,
                "Item": "Education",
                "tag 1": 101,
                "tag 2": 103,
                "tag 3": 106
            },
            {
                "Item ID ": 10002,
                "Item": "Entertainment",
                "tag 1": 104,
                "tag 2": 105,
                "tag 3": 112
            }
        ]
        return Response(q1_data)


class Q2View(APIView):
    def get(self, request):
        q2_data = [
            {
                "Item ID": 200001,
                "Item ": "Manage classes",
                "tag 1": 101,
                "tag 2": 106
            },
            {
                "Item ID": 200002,
                "Item ": "conduct examination",
                "tag 1": 110,
                "tag 2": 111,
                "tag 3": 109
            },
            {
                "Item ID": 200003,
                "Item ": "create queue",
                "tag 1": 106,
                "tag 2": 101,
                "tag 3": 102
            }
        ]
        return Response(q2_data)


class Q3View(APIView):
    def get(self, request):
        q3_data = [
            {
                "Item ID": 300001,
                "Item": "classes",
                "tag 1": 101,
                "tag 2": 103
            },
            {
                "Item ID": 300002,
                "Item": "students",
                "tag 1": 110,
                "tag 2": 101,
                "tag 3": 111
            }
        ]
        return Response(q3_data)
