"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/admin/Modal";
import ProductForm from "@/components/admin/ProductForm";
import { ApiError, ProductsApi } from "@/lib/api";
import type { Product, ProductInput } from "@/lib/types";

function formatPrice(price: string) {
  const num = Number(price);
  return Number.isFinite(num) ? `Rs. ${num.toFixed(2)}` : price;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await ProductsApi.list();
      setProducts(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load products.");
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

  function openEdit(product: Product) {
    setEditing(product);
    setFormOpen(true);
  }

  async function handleSubmit(data: ProductInput) {
    if (editing) {
      await ProductsApi.update(editing.id, data);
    } else {
      await ProductsApi.create(data);
    }
    setFormOpen(false);
    setEditing(null);
    await load();
  }

  async function handleDelete(product: Product) {
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    try {
      await ProductsApi.remove(product.id);
      await load();
    } catch (err) {
      alert(err instanceof ApiError ? err.message : "Failed to delete product.");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="mt-1 text-sm text-slate-500">
            {products.length} product{products.length === 1 ? "" : "s"} total
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
        >
          + Add Product
        </button>
      </div>

      {error && (
        <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-5 py-3">Product</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Featured</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-slate-400">
                  Loading products...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-slate-400">
                  No products yet. Click &quot;Add Product&quot; to create one.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50">
                  <td className="flex items-center gap-3 px-5 py-3">
                    <div className="h-10 w-10 overflow-hidden rounded-lg bg-slate-100">
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <span className="font-medium text-slate-900">{product.name}</span>
                  </td>
                  <td className="px-5 py-3 text-slate-600">{formatPrice(product.price)}</td>
                  <td className="px-5 py-3">
                    {product.is_featured ? (
                      <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">
                        Featured
                      </span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => openEdit(product)}
                      className="mr-3 font-semibold text-teal-700 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(product)}
                      className="font-semibold text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {formOpen && (
        <Modal
          title={editing ? "Edit Product" : "Add Product"}
          onClose={() => setFormOpen(false)}
        >
          <ProductForm
            initial={editing}
            onCancel={() => setFormOpen(false)}
            onSubmit={handleSubmit}
          />
        </Modal>
      )}
    </div>
  );
}
