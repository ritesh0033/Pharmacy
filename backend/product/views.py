from django.contrib.auth import authenticate
from rest_framework import viewsets, mixins, status, permissions
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Product, Testimonial, Contact
from .services import ProductService, TestimonialService, ContactService
from .serializers import (
    ProductSerializer,
    ProductCreateSerializer,
    ProductUpdateSerializer,
    TestimonialSerializer,
    TestimonialCreateSerializer,
    TestimonialUpdateSerializer,
    ContactSerializer,
    ContactCreateSerializer,
)


class LoginView(APIView):
    """POST /api/auth/login/ -> {token, username} for the admin panel."""

    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get("username", "")
        password = request.data.get("password", "")
        user = authenticate(request, username=username, password=password)
        if user is None or not user.is_staff:
            return Response(
                {"detail": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED
            )
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "username": user.username})


class ProductViewSet(viewsets.ModelViewSet):
    """
    GET    /products            -> list
    GET    /products/featured   -> featured only
    POST   /products            -> create
    GET    /products/:id        -> retrieve
    PUT    /products/:id        -> update
    PATCH  /products/:id        -> partial update
    DELETE /products/:id        -> destroy
    """

    queryset = Product.objects.all()

    def get_permissions(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_serializer_class(self):
        if self.action == "create":
            return ProductCreateSerializer
        if self.action in ("update", "partial_update"):
            return ProductUpdateSerializer
        return ProductSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = ProductService.create_product(serializer.validated_data)
        return Response(

            ProductSerializer(product, context={"request": request}).data,
            status=status.HTTP_201_CREATED,
        )

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        product = self.get_object()
        serializer = self.get_serializer(product, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        product = ProductService.update_product(product, serializer.validated_data)
        return Response(ProductSerializer(product, context={"request": request}).data)

    def destroy(self, request, *args, **kwargs):
        product = self.get_object()
        ProductService.delete_product(product)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=["get"])
    def featured(self, request):
        featured = ProductService.list_featured()
        serializer = ProductSerializer(featured, many=True, context={"request": request})
        return Response(serializer.data)


class TestimonialViewSet(viewsets.ModelViewSet):
    """
    GET    /testimonials        -> list
    POST   /testimonials        -> create
    GET    /testimonials/:id    -> retrieve
    PUT    /testimonials/:id    -> update
    PATCH  /testimonials/:id    -> partial update
    DELETE /testimonials/:id    -> destroy
    """

    queryset = Testimonial.objects.all()

    def get_permissions(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_serializer_class(self):
        if self.action == "create":
            return TestimonialCreateSerializer
        if self.action in ("update", "partial_update"):
            return TestimonialUpdateSerializer
        return TestimonialSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        testimonial = TestimonialService.create_testimonial(serializer.validated_data)
        return Response(
            TestimonialSerializer(testimonial, context={"request": request}).data,
            status=status.HTTP_201_CREATED,
        )

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        testimonial = self.get_object()
        serializer = self.get_serializer(testimonial, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        testimonial = TestimonialService.update_testimonial(
            testimonial, serializer.validated_data
        )
        return Response(
            TestimonialSerializer(testimonial, context={"request": request}).data
        )

    def destroy(self, request, *args, **kwargs):
        testimonial = self.get_object()
        TestimonialService.delete_testimonial(testimonial)
        return Response(status=status.HTTP_204_NO_CONTENT)


class ContactViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    """
    POST   /contacts        -> submit (public form)
    GET    /contacts        -> list (admin)
    GET    /contacts/:id    -> retrieve
    DELETE /contacts/:id    -> delete (optional)

    No update endpoint by design — messages are read-only after submission.
    """

    queryset = Contact.objects.all()

    def get_permissions(self):
        if self.action == "create":
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get_serializer_class(self):
        if self.action == "create":
            return ContactCreateSerializer
        return ContactSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        message = ContactService.create_message(serializer.validated_data)
        return Response(
            ContactSerializer(message).data, status=status.HTTP_201_CREATED
        )

    def destroy(self, request, *args, **kwargs):
        message = self.get_object()
        ContactService.delete_message(message)
        return Response(status=status.HTTP_204_NO_CONTENT)