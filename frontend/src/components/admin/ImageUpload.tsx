"use client";

import { useEffect, useId, useState } from "react";

export default function ImageUpload({
  existingImageUrl,
  onChange,
}: {
  existingImageUrl?: string;
  onChange: (file: File | null) => void;
}) {
  const inputId = useId();
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function handleFile(file: File | null) {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(file ? URL.createObjectURL(file) : null);
    onChange(file);
  }

  const displayUrl = preview ?? existingImageUrl;

  return (
    <div className="mt-1">
      <label
        htmlFor={inputId}
        className="group relative flex h-40 w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-teal-400 hover:bg-teal-50/40"
      >
        {displayUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={displayUrl} alt="Product preview" className="h-full w-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100">
              <span className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow">
                Change Image
              </span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-1 px-4 text-center">
            <span className="text-3xl">🖼️</span>
            <span className="text-base font-semibold text-slate-700">
              Click to upload an image
            </span>
            <span className="text-sm text-slate-500">PNG or JPG, up to a few MB</span>
          </div>
        )}
        <input
          id={inputId}
          type="file"
          accept="image/*"
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </label>
    </div>
  );
}
