export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-teal-50 to-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
        <div>
          <span className="inline-flex items-center rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700">
            Trusted by 10,000+ customers
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Your health, delivered <span className="text-teal-600">right to your door</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-600">
            PharmaCare brings genuine medicines, wellness products, and expert care together —
            order online and get it delivered fast, safely, and affordably.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#products"
              className="rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
            >
              Shop Products
            </a>
            <a
              href="#contact"
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-400 hover:text-teal-700"
            >
              Talk to Us
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-square w-full overflow-hidden rounded-3xl bg-teal-100 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=900"
              alt="Pharmacist preparing medicine"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
