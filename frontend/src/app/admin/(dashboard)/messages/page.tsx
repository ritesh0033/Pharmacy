"use client";

import { useEffect, useState } from "react";
import { ApiError, ContactsApi } from "@/lib/api";
import type { ContactMessage } from "@/lib/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await ContactsApi.list();
      setMessages(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load messages.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(message: ContactMessage) {
    if (!confirm(`Delete the message from "${message.name}"? This cannot be undone.`)) return;
    try {
      await ContactsApi.remove(message.id);
      await load();
    } catch (err) {
      alert(err instanceof ApiError ? err.message : "Failed to delete message.");
    }
  }

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Contact Messages</h1>
        <p className="mt-1 text-sm text-slate-500">
          {messages.length} message{messages.length === 1 ? "" : "s"} submitted through the
          contact form
        </p>
      </div>

      {error && (
        <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      <div className="mt-6 space-y-3">
        {loading ? (
          <p className="text-slate-400">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-slate-400">No messages yet.</p>
        ) : (
          messages.map((message) => {
            const expanded = expandedId === message.id;
            return (
              <div
                key={message.id}
                className="rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(expanded ? null : message.id)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-900">
                      {message.name}{" "}
                      <span className="font-normal text-slate-500">— {message.email}</span>
                    </p>
                    {!expanded && (
                      <p className="mt-0.5 truncate text-sm text-slate-500">{message.message}</p>
                    )}
                  </div>
                  <span className="shrink-0 text-xs text-slate-400">
                    {formatDate(message.submitted_at)}
                  </span>
                </button>

                {expanded && (
                  <div className="border-t border-slate-100 px-5 py-4">
                    <p className="whitespace-pre-wrap text-sm text-slate-700">
                      {message.message}
                    </p>
                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleDelete(message)}
                        className="text-sm font-semibold text-red-600 hover:underline"
                      >
                        Delete Message
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
