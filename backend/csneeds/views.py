from rest_framework.views import APIView
from rest_framework.response import Response


class Q1View(APIView):
    def get(self, request):
        q1 = [
            {
                "Item ID": 10001,
                "Item":"Education",
                "tag 1": 101,
                "tag 2": 103,
                "tag 3": 106
            },
            {
                "Item ID":10002,
                "Item": "Entertainment",
                "tag 1": 104,
                "tag 2": 105,
                "tag 3": 112
            }
        ]
       # new_dict = {item["Item ID"]:item["Item"] for item in q1}
        return Response(q1)


class Q2View(APIView):
    def get(self, request):
        q2 = [
            {
                "Item ID": 200001,
                "Item": "Manage classes",
                "tag 1": 101,
                "tag 2": 106
            },
            {
                "Item ID": 200002,
                "Item": "Conduct examination",
                "tag 1": 110,
                "tag 2": 111,
                "tag 3": 109
            },
            {
                "Item ID": 200003,
                "Item": "Create queue",
                "tag 1": 106,
                "tag 2": 101,
                "tag 3": 102
            }
        ]
        # new_dict = {item["Item ID"]: item["Item"] for item in q2}
        return Response(q2)


class Q3View(APIView):
    def get(self, request):
        q3 = [
            {
                "Item ID": 300001,
                "Item":"Classes",
                "tag 1": 101,
                "tag 2": 103
            },
            {
                "Item ID": 300002,
                "Item":"Students",
                "tag 1": 110,
                "tag 2": 101,
                "tag 3": 111
            }
        ]
        # new_dict = {item["Item ID"]: item["Item"] for item in q3}
        return Response(q3)
