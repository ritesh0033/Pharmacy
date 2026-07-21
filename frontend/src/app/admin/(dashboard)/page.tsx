import { cookies } from "next/headers";
import Link from "next/link";
import { ContactsApi, ProductsApi, TestimonialsApi } from "@/lib/api";

async function safeCount(fn: () => Promise<{ length: number }>) {
  try {
    const data = await fn();
    return data.length;
  } catch {
    return null;
  }
}

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  const [productCount, testimonialCount, messageCount] = await Promise.all([
    safeCount(ProductsApi.list),
    safeCount(TestimonialsApi.list),
    safeCount(() => ContactsApi.list(token)),
  ]);

  const cards = [
    { label: "Products", value: productCount, href: "/admin/products", icon: "💊" },
    { label: "Testimonials", value: testimonialCount, href: "/admin/testimonials", icon: "💬" },
    { label: "Contact Messages", value: messageCount, href: "/admin/messages", icon: "✉️" },
  ];

  const offline = cards.every((c) => c.value === null);

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-base text-slate-500">
        Manage your products, testimonials, and contact messages.
      </p>

      {offline && (
        <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-base text-red-700">
          Couldn&apos;t reach the API at the configured backend URL. Make sure the Django
          server is running.
        </p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-4xl">{card.icon}</span>
              <span className="text-4xl font-bold text-slate-900">
                {card.value ?? "—"}
              </span>
            </div>
            <p className="mt-3 text-base font-semibold text-slate-600">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
