from rest_framework import serializers
from .models import Services


class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = ["category", "location", "product"]