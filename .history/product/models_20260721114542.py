from django.db import models


class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Product(TimestampedModel):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()
    image = models.ImageField(upload_to='product_images/', null=True, blank=True)
    is_featured = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']
    def __str__(self):
        return self.name

class Testimonial(TimestampedModel):
    name = models.CharField(max_length=255,help_text="Enter the name of the person giving the testimonial")
    image = models.ImageField(upload_to='testimonial_images/', null=True, blank=True) 
    message = models.TextField(help_text="Enter the testimonial message")
   

    class Meta:
        ordering = ['-created_at']
    def __str__(self):
        return self.name
    
class Contact(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    message = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-submitted_at"]

    def __str__(self):
        return f"{self.name} <{self.email}>"