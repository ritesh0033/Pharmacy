from rest_framework import serializers
from .models import Product, Contact, Testimonial


# ---------- Product ----------
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price',
            'image', 'is_featured', 'created_at', 'updated_at',
        ]


class ProductCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['name', 'description', 'price', 'image', 'is_featured']

    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Name is required.")
        return value

    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError("Price cannot be negative.")
        return value


class ProductUpdateSerializer(serializers.ModelSerializer):
   

    class Meta:
        model = Product
        fields = ['name', 'description', 'price', 'image', 'is_featured']

    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Name is required.")
        return value

    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError("Price cannot be negative.")
        return value


# ---------- Testimonial ----------
class TestimonialSerializer(serializers.ModelSerializer):
    """Read — used for GET (list, retrieve)."""

    class Meta:
        model = Testimonial
        fields = ['id', 'name', 'image', 'message', 'created_at', 'updated_at']


class TestimonialCreateSerializer(serializers.ModelSerializer):
    """Create — used for POST."""

    class Meta:
        model = Testimonial
        fields = ['name', 'image', 'message']

    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Name is required.")
        return value

    def validate_message(self, value):
        if not value.strip():
            raise serializers.ValidationError("Message is required.")
        return value


class TestimonialUpdateSerializer(serializers.ModelSerializer):
    """Update — used for PUT/PATCH."""

    class Meta:
        model = Testimonial
        fields = ['name', 'image', 'message']

    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Name is required.")
        return value

    def validate_message(self, value):
        if not value.strip():
            raise serializers.ValidationError("Message is required.")
        return value


# ---------- Contact ----------
class ContactSerializer(serializers.ModelSerializer):
    """Read — used for GET (admin message list)."""

    class Meta:
        model = Contact
        fields = ['id', 'name', 'email', 'message', 'submitted_at']


class ContactCreateSerializer(serializers.ModelSerializer):
    """Create — used for POST (public contact form)."""

    class Meta:
        model = Contact
        fields = ['name', 'email', 'message']

    def validate_message(self, value):
        if not value.strip():
            raise serializers.ValidationError("Message is required.")
        return value