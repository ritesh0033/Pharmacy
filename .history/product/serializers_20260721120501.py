from rest_framework import serializers
from .models import Product, Contact, Testimonial


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'image', 'is_featured', 'created_at', 'updated_at']

class ProductCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['name', 'description', 'price', 'image', 'is_featured']
        
                