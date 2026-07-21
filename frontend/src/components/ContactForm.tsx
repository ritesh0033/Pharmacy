"use client";

import { FormEvent, useState } from "react";
import { ApiError, ContactsApi } from "@/lib/api";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    try {
      await ContactsApi.create({ name, email, message });
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <section id="contact" className="bg-teal-700 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        <div className="text-white">
          <h2 className="text-3xl font-bold sm:text-4xl">Get in Touch</h2>
          <p className="mt-4 max-w-md text-teal-100">
            Have a question about a product or an order? Send us a message and our team
            will get back to you within 24 hours.
          </p>
          <div className="mt-8 space-y-2 text-sm text-teal-100">
            <p>📍 221B Wellness Street, Bengaluru, India</p>
            <p>📞 +91 98765 43210</p>
            <p>✉️ support@pharmacare.example</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-6 shadow-lg sm:p-8"
        >
          {status === "success" && (
            <p className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-base text-green-700">
              Thanks for reaching out! We&apos;ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-base text-red-700">{error}</p>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-base font-medium text-slate-700">
                Name
              </label>
              <input
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-base focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-base font-medium text-slate-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-base focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                placeholder="jane@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-base font-medium text-slate-700">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-base focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                placeholder="How can we help?"
              />
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full rounded-lg bg-teal-600 px-4 py-3 text-base font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
