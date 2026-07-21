export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export type ProductInput = {
  name: string;
  description: string;
  price: string;
  image?: File | null;
  is_featured: boolean;
};

export interface Testimonial {
  id: number;
  name: string;
  image: string;
  message: string;
  created_at: string;
  updated_at: string;
}

export type TestimonialInput = {
  name: string;
  image?: File | null;
  message: string;
};

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  submitted_at: string;
}

export type ContactInput = {
  name: string;
  email: string;
  message: string;
};
