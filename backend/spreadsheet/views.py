from rest_framework.views import APIView
from .function import calculate_weighted_sum, get_item_name
from django.http import JsonResponse


class SpreadsheetView(APIView):

    def post(self, request):
        Q1Regression_id = request.data.get('Q1Regression')
        Q2Regression_id = request.data.get('Q2Regression')
        Q3Regression_id = request.data.get('Q3Regression')
        user_input_data = request.data.get('input')

        # Calculate the weighted sum for each data
        result_one = calculate_weighted_sum("Q1", Q1Regression_id, user_input_data)
        result_two = calculate_weighted_sum("Q2", Q2Regression_id, user_input_data)
        result_three = calculate_weighted_sum("Q3", Q3Regression_id, user_input_data)

        # Get item names
        Q1Regression_item = get_item_name("Q1", Q1Regression_id)
        Q2Regression_item = get_item_name("Q2", Q2Regression_id)
        Q3Regression_item = get_item_name("Q3", Q3Regression_id)

        # Return the calculated data in the JSON response
        return JsonResponse(
            [
                {"category": Q1Regression_item, "value": result_one, "cell_value": Q1Regression_id},
                {"category": Q2Regression_item, "value": result_two, "cell_value": Q2Regression_id},
                {"category": Q3Regression_item, "value": result_three, "cell_value": Q3Regression_id},
            ], safe=False
        )
