import { getToken } from "./auth";
import type {
  ContactInput,
  ContactMessage,
  Product,
  ProductInput,
  Testimonial,
  TestimonialInput,
} from "./types";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

export class ApiError extends Error {
  status: number;
  fieldErrors: Record<string, string[]> | null;

  constructor(
    message: string,
    status: number,
    fieldErrors: Record<string, string[]> | null = null,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const isFormData = options.body instanceof FormData;
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    cache: "no-store",
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Token ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });

  if (res.status === 204) {
    return undefined as T;
  }

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const body = isJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    const fieldErrors =
      body && typeof body === "object" ? (body as Record<string, string[]>) : null;
    const message =
      fieldErrors && Object.keys(fieldErrors).length > 0
        ? Object.entries(fieldErrors)
            .map(([field, msgs]) => `${field}: ${[].concat(msgs as never).join(", ")}`)
            .join(" | ")
        : `Request failed with status ${res.status}`;
    throw new ApiError(message, res.status, fieldErrors);
  }

  return body as T;
}

function productFormData(data: ProductInput) {
  const form = new FormData();
  form.append("name", data.name);
  form.append("description", data.description);
  form.append("price", data.price);
  form.append("is_featured", String(data.is_featured));
  if (data.image) form.append("image", data.image);
  return form;
}

function testimonialFormData(data: TestimonialInput) {
  const form = new FormData();
  form.append("name", data.name);
  form.append("message", data.message);
  if (data.image) form.append("image", data.image);
  return form;
}

// ---------- Products ----------
export const ProductsApi = {
  list: () => request<Product[]>("/products/"),
  featured: () => request<Product[]>("/products/featured/"),
  get: (id: number) => request<Product>(`/products/${id}/`),
  create: (data: ProductInput) =>
    request<Product>("/products/", { method: "POST", body: productFormData(data) }),
  update: (id: number, data: ProductInput) =>
    request<Product>(`/products/${id}/`, { method: "PUT", body: productFormData(data) }),
  remove: (id: number) => request<void>(`/products/${id}/`, { method: "DELETE" }),
};

// ---------- Testimonials ----------
export const TestimonialsApi = {
  list: () => request<Testimonial[]>("/testimonials/"),
  get: (id: number) => request<Testimonial>(`/testimonials/${id}/`),
  create: (data: TestimonialInput) =>
    request<Testimonial>("/testimonials/", { method: "POST", body: testimonialFormData(data) }),
  update: (id: number, data: TestimonialInput) =>
    request<Testimonial>(`/testimonials/${id}/`, { method: "PUT", body: testimonialFormData(data) }),
  remove: (id: number) => request<void>(`/testimonials/${id}/`, { method: "DELETE" }),
};

// ---------- Contact messages ----------
export const ContactsApi = {
  list: (token?: string) =>
    request<ContactMessage[]>("/contacts/", {
      headers: token ? { Authorization: `Token ${token}` } : {},
    }),
  get: (id: number) => request<ContactMessage>(`/contacts/${id}/`),
  create: (data: ContactInput) =>
    request<ContactMessage>("/contacts/", { method: "POST", body: JSON.stringify(data) }),
  remove: (id: number) => request<void>(`/contacts/${id}/`, { method: "DELETE" }),
};

// ---------- Auth ----------
export const AuthApi = {
  login: (username: string, password: string) =>
    request<{ token: string; username: string }>("/auth/login/", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),
};
