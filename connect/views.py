from rest_framework.views import APIView
from rest_framework.response import Response
from .connect_manager import get_filtered_data


# Create your views here.
class ConnectDataThreeView(APIView):
    def get(self, request):
        filtered_data = get_filtered_data(request)
        return Response(filtered_data)


class ConnectDataTwoView(APIView):
    def get(self, request):
        filtered_data = get_filtered_data(request)
        return Response(filtered_data)


class ConnectDataView(APIView):
    def get(self, request):
        filtered_data = get_filtered_data(request)
        return Response(filtered_data)
