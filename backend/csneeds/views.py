from rest_framework.views import APIView
from rest_framework.response import Response


class Q1View(APIView):
    def get(self, request):
        q1 = [
            [
                "Item ID",
                "Item",
                "tag 1",
                "tag 2",
                "tag 3"
            ],
            [
                10001,
                "Education",
                "101",
                "103",
                "106"
            ],
            [
                10002,
                "Entertainment",
                "104",
                "105",
                "112"
            ]
        ]
        columns = q1[0]
        converted_q1_data = []

        for row in q1[1:]:
            converted_item = {
                columns[0]: row[0],
                columns[1]: row[1],
                "tags": set(str(tag) for tag in row[2:])
            }
            converted_q1_data.append(converted_item)

        return Response(converted_q1_data)


class Q2View(APIView):
    def get(self, request):
        q2 = [
            [
                "Item ID",
                "Item",
                "tag 1",
                "tag 2"
            ],
            [
                200001,
                "Manage classes",
                101,
                106
            ],
            [
                200002,
                "Conduct examination",
                110,
                111,
                109
            ],
            [
                200003,
                "Create queue",
                106,
                101,
                102
            ]
        ]

        columns = q2[0]
        converted_q2_data = []

        for row in q2[1:]:
            converted_item = {
                columns[0]: row[0],
                columns[1]: row[1],
                "tags": set(str(tag) for tag in row[2:])
            }
            converted_q2_data.append(converted_item)

        return Response(converted_q2_data)


class Q3View(APIView):
    def get(self, request):
        q3 = [
            [
                "Item ID",
                "Item",
                "tag 1",
                "tag 2"
            ],
            [
                300001,
                "Classes",
                101,
                103
            ],
            [
                300002,
                "Students",
                110,
                101,
                111
            ],
        ]

        columns = q3[0]
        converted_q3_data = []

        for row in q3[1:]:
            converted_item = {
                columns[0]: row[0],
                columns[1]: row[1],
                "tags": set(str(tag) for tag in row[2:])
            }
            converted_q3_data.append(converted_item)
        return Response(converted_q3_data)
