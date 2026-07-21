# Assignment Backend

A Django REST Framework API serving product listings, testimonials, and a contact form.

## Tech Stack

- Python / Django 6.0
- Django REST Framework
- drf-spectacular (OpenAPI schema, Swagger & Redoc UI)
- django-cors-headers
- SQLite (default local database)

## Project Structure

```
backend/
├── core/               # Django project (settings, urls, wsgi/asgi)
└── product/            # App: products, testimonials, contacts
    ├── models.py       # Product, Testimonial, Contact
    ├── serializers.py
    ├── services.py     # Business logic layer
    ├── views.py        # DRF ViewSets
    └── urls.py         # Router-based API routes
```

## Getting Started

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

pip install -r requirements.txt

python manage.py migrate
python manage.py createsuperuser   # optional, for /admin access
python manage.py runserver
```

The API will be available at `http://127.0.0.1:8000/`.

## API Endpoints

All endpoints are prefixed with `/api/`.

### Products
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products/` | List all products |
| GET | `/api/products/featured/` | List featured products only |
| POST | `/api/products/` | Create a product |
| GET | `/api/products/:id/` | Retrieve a product |
| PUT/PATCH | `/api/products/:id/` | Update a product |
| DELETE | `/api/products/:id/` | Delete a product |

### Testimonials
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/testimonials/` | List testimonials |
| POST | `/api/testimonials/` | Create a testimonial |
| GET | `/api/testimonials/:id/` | Retrieve a testimonial |
| PUT/PATCH | `/api/testimonials/:id/` | Update a testimonial |
| DELETE | `/api/testimonials/:id/` | Delete a testimonial |

### Contacts
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/contacts/` | Submit a contact message |
| GET | `/api/contacts/` | List contact messages |
| GET | `/api/contacts/:id/` | Retrieve a contact message |
| DELETE | `/api/contacts/:id/` | Delete a contact message |

## API Documentation

- Swagger UI: `/api/v1/swagger/`
- Redoc UI: `/api/v1/redoc/`
- OpenAPI schema: `/api/v1/schema/`

## Admin

Django admin is available at `/admin/` (requires a superuser).
