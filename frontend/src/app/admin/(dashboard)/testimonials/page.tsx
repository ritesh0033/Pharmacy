"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/admin/Modal";
import TestimonialForm from "@/components/admin/TestimonialForm";
import { ApiError, TestimonialsApi } from "@/lib/api";
import type { Testimonial, TestimonialInput } from "@/lib/types";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await TestimonialsApi.list();
      setTestimonials(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load testimonials.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(testimonial: Testimonial) {
    setEditing(testimonial);
    setFormOpen(true);
  }

  async function handleSubmit(data: TestimonialInput) {
    if (editing) {
      await TestimonialsApi.update(editing.id, data);
    } else {
      await TestimonialsApi.create(data);
    }
    setFormOpen(false);
    setEditing(null);
    await load();
  }

  async function handleDelete(testimonial: Testimonial) {
    if (!confirm(`Delete testimonial from "${testimonial.name}"? This cannot be undone.`)) return;
    try {
      await TestimonialsApi.remove(testimonial.id);
      await load();
    } catch (err) {
      alert(err instanceof ApiError ? err.message : "Failed to delete testimonial.");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Testimonials</h1>
          <p className="mt-1 text-sm text-slate-500">
            {testimonials.length} testimonial{testimonials.length === 1 ? "" : "s"} total
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
        >
          + Add Testimonial
        </button>
      </div>

      {error && (
        <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {loading ? (
          <p className="text-slate-400">Loading testimonials...</p>
        ) : testimonials.length === 0 ? (
          <p className="text-slate-400">
            No testimonials yet. Click &quot;Add Testimonial&quot; to create one.
          </p>
        ) : (
          testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-100">
                  {testimonial.image && (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <span className="font-semibold text-slate-900">{testimonial.name}</span>
              </div>
              <p className="mt-3 flex-1 text-sm text-slate-600">{testimonial.message}</p>
              <div className="mt-4 flex justify-end gap-3 border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={() => openEdit(testimonial)}
                  className="text-sm font-semibold text-teal-700 hover:underline"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(testimonial)}
                  className="text-sm font-semibold text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {formOpen && (
        <Modal
          title={editing ? "Edit Testimonial" : "Add Testimonial"}
          onClose={() => setFormOpen(false)}
        >
          <TestimonialForm
            initial={editing}
            onCancel={() => setFormOpen(false)}
            onSubmit={handleSubmit}
          />
        </Modal>
      )}
    </div>
  );
}
