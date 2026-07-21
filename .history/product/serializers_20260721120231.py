from rest_framework import serializers
from .models import Product, Contact, Testimonial

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'F 