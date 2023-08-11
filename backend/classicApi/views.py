from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


# Create your views here.

# def submit_classic_data(request):
#     if request.method == 'POST':
#         values = [request.POST.get(f'value{i}', '') for i in range(1, 6)]
#
#         response_data = {
#             "message": "Data post Successfully",
#             "values": values,
#         }
#         return JsonResponse(response_data)
#     else:
#         return JsonResponse({"error": "Invalid request method"})


@csrf_exempt
def classic_data_view(request):
    if request.method == 'GET':
        return JsonResponse({"message": "This is a GET request. Use POST to send data."})
    elif request.method == 'POST':
        try:
            data = json.loads(request.body)
            row_values = data.get('rowValues', [])
            return JsonResponse({"message": "Data posted successfully", "posted_data": row_values})
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"})
    else:
        return JsonResponse({"error": "Invalid request method"})
