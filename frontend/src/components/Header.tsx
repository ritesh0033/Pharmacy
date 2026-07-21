"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#products", label: "Products" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Main nav */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-600 text-xl font-bold text-white shadow-sm">
            +
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-2xl font-extrabold tracking-tight text-slate-900">
              PharmaCare
            </span>
            <span className="text-xs font-medium uppercase tracking-wider text-teal-700">
              Your Trusted Online Pharmacy
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-lg font-semibold text-slate-700 transition hover:text-teal-700"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-teal-600 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <a
            href="#contact"
            className="rounded-full bg-teal-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-teal-700 hover:shadow-md"
          >
            Get in Touch
          </a>
          <Link
            href="/admin"
            className="border-l border-slate-200 pl-6 text-base font-semibold text-slate-600 hover:text-teal-700"
          >
            Admin Login
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 text-xl text-slate-600 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-slate-200 bg-white px-6 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-lg font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-700"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-teal-600 px-5 py-2.5 text-center text-base font-semibold text-white"
          >
            Get in Touch
          </a>
          <Link
            href="/admin"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-md px-3 py-2.5 text-center text-lg font-semibold text-slate-600 hover:bg-teal-50 hover:text-teal-700"
          >
            Admin Login
          </Link>
        </nav>
      )}
    </header>
  );
}
