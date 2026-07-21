import About from "@/components/About";
import ContactForm from "@/components/ContactForm";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import { ProductsApi, TestimonialsApi } from "@/lib/api";
import type { Product, Testimonial } from "@/lib/types";

export default async function Home() {
  let products: Product[] = [];
  let testimonials: Testimonial[] = [];

  try {
    [products, testimonials] = await Promise.all([
      ProductsApi.featured(),
      TestimonialsApi.list(),
    ]);
  } catch {
    // Backend may be unreachable during local development / build — render an empty state.
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <FeaturedProducts products={products} />
        <Testimonials testimonials={testimonials} />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
