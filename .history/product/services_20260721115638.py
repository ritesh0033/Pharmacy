"""
Service layer.

Business logic lives here, isolated from HTTP concerns (views) and
data-shaping concerns (serializers). Views call these functions; the
services own how data is created, fetched, and mutated.

Keeping logic here means:
  - views stay thin (just wire HTTP <-> service)
  - logic is reusable (a management command, a Celery task, or a test
    can call the same function without going through a request)
  - each piece is independently testable
"""
from django.db.models import QuerySet
from .models import Product, Testimonial, Contact


class ProductService:
    @staticmethod
    def list_products() -> QuerySet[Product]:
        return Product.objects.all()

    @staticmethod
    def list_featured() -> QuerySet[Product]:
        # The one real business rule in the app: only featured products
        # surface on the public landing page.
        return Product.objects.filter(is_featured=True)

    @staticmethod
    def create_product(data: dict) -> Product:
        return Product.objects.create(**data)

    @staticmethod
    def update_product(product: Product, data: dict) -> Product:
        for field, value in data.items():
            setattr(product, field, value)
        product.save()
        return product

    @staticmethod
    def delete_product(product: Product) -> None:
        product.delete()


class TestimonialService:
    @staticmethod
    def list_testimonials() -> QuerySet[Testimonial]:
        return Testimonial.objects.all()

    @staticmethod
    def create_testimonial(data: dict) -> Testimonial:
        return Testimonial.objects.create(**data)

    @staticmethod
    def update_testimonial(testimonial: Testimonial, data: dict) -> Testimonial:
        for field, value in data.items():
            setattr(testimonial, field, value)
        testimonial.save()
        return testimonial

    @staticmethod
    def delete_testimonial(testimonial: Testimonial) -> None:
        testimonial.delete()


class ContactService:
    @staticmethod
    def list_messages() -> QuerySet[Contact]:
        return Contact.objects.all()

    @staticmethod
    def create_message(data: dict) -> Contact:
        return Contact.objects.create(**data)

    @staticmethod
    def delete_message(message: Contact) -> None:
        message.delete()