"use client";

import { AlertTriangle } from "lucide-react";

export default function PublicError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-1 items-center justify-center py-32 px-4">
      <div className="max-w-md text-center">
        <AlertTriangle className="mx-auto mb-4 size-12 text-festika-orange" />
        <h2 className="mb-2 font-heading text-2xl font-bold text-festika-navy">
          Ada yang salah
        </h2>
        <p className="mb-6 text-gray-500">
          Terjadi kesalahan saat memuat halaman. Silakan coba lagi.
        </p>
        <button
          onClick={reset}
          className="bg-festika-orange hover:bg-festika-orange-dark cursor-pointer px-6 py-2.5 text-sm font-bold text-white transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
}
