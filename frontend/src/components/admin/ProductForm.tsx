"use client";

import dynamic from "next/dynamic";
import { FormEvent, useState } from "react";
import ImageUpload from "@/components/admin/ImageUpload";
import type { Product, ProductInput } from "@/lib/types";

const RichTextEditor = dynamic(() => import("@/components/admin/RichTextEditor"), {
  ssr: false,
  loading: () => (
    <div className="mt-1 h-32 animate-pulse rounded-lg border border-slate-200 bg-slate-50" />
  ),
});

const inputClass =
  "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-base focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500";

export default function ProductForm({
  initial,
  onSubmit,
  onCancel,
}: {
  initial: Product | null;
  onSubmit: (data: ProductInput) => Promise<void>;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [price, setPrice] = useState(initial?.price ?? "");
  const [image, setImage] = useState<File | null>(null);
  const [isFeatured, setIsFeatured] = useState(initial?.is_featured ?? false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasImage = Boolean(image || initial?.image);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!description.trim()) {
      setError("Description is required.");
      return;
    }
    if (!hasImage) {
      setError("Product image is required.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit({ name, description, price, image, is_featured: isFeatured });
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
        <label htmlFor="product-name" className="block text-base font-medium text-slate-700">
          Name
        </label>
        <input
          id="product-name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-base font-medium text-slate-700">Description</label>
        <RichTextEditor value={description} onChange={setDescription} />
        {!description.trim() && (
          <p className="mt-1 text-sm text-red-600">Description is required.</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="product-price" className="block text-base font-medium text-slate-700">
            Price
          </label>
          <input
            id="product-price"
            required
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="flex items-end pb-2">
          <label className="flex items-center gap-2 text-base font-medium text-slate-700">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
            />
            Featured
          </label>
        </div>
      </div>

      <div>
        <label className="block text-base font-medium text-slate-700">
          Product Image <span className="text-red-600">*</span>
        </label>
        <ImageUpload existingImageUrl={initial?.image} onChange={setImage} />
        {!hasImage && (
          <p className="mt-1 text-sm text-red-600">Product image is required.</p>
        )}
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
          {submitting ? "Saving..." : initial ? "Save Changes" : "Create Product"}
        </button>
      </div>
    </form>
  );
}
