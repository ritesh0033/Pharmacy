from django.contrib import admin
from .models import Product, Testimonial, Contact


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "is_featured", "created_at")
    list_filter = ("is_featured", "created_at")
    search_fields = ("name", "description")
    list_editable = ("is_featured",)
    readonly_fields = ("created_at", "updated_at")
    ordering = ("-created_at",)


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("name", "created_at")
    search_fields = ("name", "message")
    readonly_fields = ("created_at", "updated_at")
    ordering = ("-created_at",)


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "submitted_at")
    search_fields = ("name", "email", "message")
    readonly_fields = ("name", "email", "message", "submitted_at")
    ordering = ("-submitted_at",)

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False