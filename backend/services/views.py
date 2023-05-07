from rest_framework import generics
from django.http.response import JsonResponse
from .models import Services
from .serializers import ServicesSerializer


# Create your views here.
class ServiceView(generics.ListAPIView):
    queryset = Services.objects.all()
    serializer_class = ServicesSerializer
    def post(self, request):
        data = request.data
        serializer = ServicesSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Service Added Successfully", safe=False)
        return JsonResponse("Failed to Add Service", safe=False)

