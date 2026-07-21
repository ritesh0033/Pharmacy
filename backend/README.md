# PharmaCare Backend

A Django REST Framework API serving products, testimonials, and contact messages for the
PharmaCare pharmacy landing page and its admin panel.

## Tech Stack

- Python / Django 6.0
- Django REST Framework (+ Token authentication)
- Pillow (image upload handling)
- drf-spectacular (OpenAPI schema, Swagger & Redoc UI)
- django-cors-headers
- SQLite (default local database)

## Project Structure

```
backend/
├── core/               # Django project (settings, urls, wsgi/asgi)
└── product/            # App: products, testimonials, contacts, admin login
    ├── models.py       # Product, Testimonial, Contact
    ├── serializers.py
    ├── services.py     # Business logic layer
    ├── views.py        # DRF ViewSets + LoginView
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
python manage.py runserver
```

The API will be available at `http://127.0.0.1:8000/`.

### Admin panel login

The frontend's `/admin` panel authenticates against a Django staff user. Create one with:

```bash
python manage.py createsuperuser
```

Log in with those credentials at `/admin/login` on the frontend.

### Uploaded images

Product and testimonial photos are uploaded as real files (not URLs) and stored under
`backend/media/`. This folder is created automatically and is git-ignored — nothing to set up.

### Demoing the live (Vercel) frontend against this local backend

If you deploy the frontend to Vercel but keep this backend running locally, add your Vercel
URL to `CORS_ALLOWED_ORIGINS` in `core/settings.py` (see the commented example there) —
otherwise the browser will block the live site's requests to your local API.

## API Endpoints

All endpoints are prefixed with `/api/`. Endpoints marked 🔒 require an
`Authorization: Token <token>` header (obtained from the login endpoint below).

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login/` | Log in with `{ username, password }`, returns `{ token, username }` |

### Products
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products/` | List all products |
| GET | `/api/products/featured/` | List featured products only |
| POST 🔒 | `/api/products/` | Create a product (multipart form, `image` required) |
| GET | `/api/products/:id/` | Retrieve a product |
| PUT/PATCH 🔒 | `/api/products/:id/` | Update a product |
| DELETE 🔒 | `/api/products/:id/` | Delete a product |

### Testimonials
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/testimonials/` | List testimonials |
| POST 🔒 | `/api/testimonials/` | Create a testimonial (multipart form) |
| GET | `/api/testimonials/:id/` | Retrieve a testimonial |
| PUT/PATCH 🔒 | `/api/testimonials/:id/` | Update a testimonial |
| DELETE 🔒 | `/api/testimonials/:id/` | Delete a testimonial |

### Contacts
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/contacts/` | Submit a contact message (public) |
| GET 🔒 | `/api/contacts/` | List contact messages |
| GET 🔒 | `/api/contacts/:id/` | Retrieve a contact message |
| DELETE 🔒 | `/api/contacts/:id/` | Delete a contact message |

## API Documentation

- Swagger UI: `/api/v1/swagger/`
- Redoc UI: `/api/v1/redoc/`
- OpenAPI schema: `/api/v1/schema/`

## Django Admin

Django's built-in admin is available at `/admin/` (separate from the frontend's `/admin`,
which talks to the API above) and requires a superuser.

## Deploying

The assignment allows running the backend locally instead of deploying it. If you do deploy it
(e.g. Render, Railway):

- Set `DEBUG = False` and add your backend's domain to `ALLOWED_HOSTS` in `core/settings.py`.
- Add your deployed frontend's URL to `CORS_ALLOWED_ORIGINS`.
- Swap SQLite for a managed Postgres database (SQLite's file storage doesn't persist reliably
  on most free-tier hosts).
- Serve `media/` uploads via the host's persistent disk or an object store (SQLite-style local
  disk storage is also not guaranteed to persist across deploys on most free tiers).
