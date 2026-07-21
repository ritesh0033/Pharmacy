from rest_framework import serializers
from .models import Product, Contact, Testimonial


class ProductSerializer(serializers.ModelSerializer):