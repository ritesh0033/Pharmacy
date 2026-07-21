"use client";

import { FormEvent, useState } from "react";
import ImageUpload from "@/components/admin/ImageUpload";
import type { Testimonial, TestimonialInput } from "@/lib/types";

const inputClass =
  "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-base focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500";

export default function TestimonialForm({
  initial,
  onSubmit,
  onCancel,
}: {
  initial: Testimonial | null;
  onSubmit: (data: TestimonialInput) => Promise<void>;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState(initial?.message ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit({ name, image, message });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-base text-red-700">{error}</p>
      )}

      <div>
        <label htmlFor="testimonial-name" className="block text-base font-medium text-slate-700">
          Name
        </label>
        <input
          id="testimonial-name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-base font-medium text-slate-700">Photo</label>
        <ImageUpload existingImageUrl={initial?.image} onChange={setImage} />
      </div>

      <div>
        <label htmlFor="testimonial-message" className="block text-base font-medium text-slate-700">
          Message
        </label>
        <textarea
          id="testimonial-message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-300 px-4 py-2.5 text-base font-semibold text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-teal-600 px-4 py-2.5 text-base font-semibold text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Saving..." : initial ? "Save Changes" : "Create Testimonial"}
        </button>
      </div>
    </form>
  );
}
