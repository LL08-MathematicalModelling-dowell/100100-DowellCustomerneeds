from rest_framework.views import APIView
from .function import sheet_latest_result
from django.http import JsonResponse


class SpreadsheetView(APIView):

    def post(self, request):
        Q1Regression = request.data['Q1Regression']
        Q2Regression = request.data['Q2Regression']
        Q3Regression = request.data['Q3Regression']
        result_one, result_two, result_three = sheet_latest_result(
            Q1Regression, Q2Regression, Q3Regression
        )

        return JsonResponse(
            [
                {"category": Q1Regression, "value": result_one},
                {"category": Q2Regression, "value": result_two},
                {"category": Q3Regression, "value": result_three}
            ], safe=False
        )
