import DOMPurify from "isomorphic-dompurify";
import type { Product } from "@/lib/types";

function formatPrice(price: string) {
  const num = Number(price);
  return Number.isFinite(num) ? `Rs. ${num.toFixed(2)}` : price;
}

function sanitize(html: string) {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["p", "br", "strong", "em", "u", "a", "ul", "ol", "li"],
    ALLOWED_ATTR: ["href", "target", "rel"],
  });
}

export default function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section id="products" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Featured Products</h2>
          <p className="mt-4 text-lg text-slate-600">
            Hand-picked essentials our customers reach for the most.
          </p>
        </div>

        {products.length === 0 ? (
          <p className="mt-12 text-center text-slate-500">
            No featured products available right now. Please check back soon.
          </p>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="aspect-square w-full overflow-hidden bg-slate-100">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                      No image
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-semibold text-slate-900">{product.name}</h3>
                  <div
                    className="prose-sm mt-1 line-clamp-2 flex-1 text-sm text-slate-600 [&_a]:underline [&_ul]:list-disc [&_ul]:pl-4"
                    dangerouslySetInnerHTML={{ __html: sanitize(product.description) }}
                  />
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-teal-700">
                      {formatPrice(product.price)}
                    </span>
                    <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                      Featured
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
