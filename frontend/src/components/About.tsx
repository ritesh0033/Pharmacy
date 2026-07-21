const FEATURES = [
  {
    title: "Genuine Products",
    description: "Every item is sourced directly from licensed manufacturers and distributors.",
    icon: "✔️",
  },
  {
    title: "Fast Delivery",
    description: "Same-day dispatch on most orders, with real-time tracking to your doorstep.",
    icon: "🚚",
  },
  {
    title: "Expert Support",
    description: "Our pharmacists are a message away for guidance on dosage and usage.",
    icon: "💬",
  },
  {
    title: "Best Prices",
    description: "Transparent pricing with regular discounts on essentials and wellness picks.",
    icon: "💰",
  },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">About PharmaCare</h2>
        <p className="mt-4 text-lg text-slate-600">
          We&apos;re a neighborhood pharmacy that went digital — combining the trust of a
          local chemist with the convenience of online ordering, so your family&apos;s
          health needs are always taken care of.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition hover:shadow-md"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-2xl">
              {feature.icon}
            </div>
            <h3 className="mt-4 font-semibold text-slate-900">{feature.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
