"use client";

import { AlertTriangle } from "lucide-react";

export default function AdminError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <AlertTriangle className="mx-auto mb-4 size-12 text-red-500" />
        <h2 className="mb-2 text-xl font-bold text-gray-900">
          Gagal memuat dashboard
        </h2>
        <p className="mb-6 text-sm text-gray-500">
          Terjadi kesalahan. Coba refresh halaman.
        </p>
        <button
          onClick={reset}
          className="cursor-pointer rounded-lg bg-festika-navy px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-festika-teal-light"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
}
