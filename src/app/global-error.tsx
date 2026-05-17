"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div
          className="flex min-h-screen items-center justify-center px-4"
          style={{ background: "linear-gradient(135deg, #0F2A36 0%, #1A3A4D 50%, #0F2A36 100%)" }}
        >
          <div className="max-w-md text-center">
            <p className="font-heading text-8xl font-black text-festika-orange">500</p>
            <h1 className="mt-4 font-heading text-2xl font-bold text-white">
              Terjadi Kesalahan
            </h1>
            <p className="mt-2 text-gray-400">
              Silakan coba lagi atau hubungi administrator.
            </p>
            <button
              onClick={() => reset()}
              className="mt-6 inline-block cursor-pointer bg-festika-orange px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-festika-orange-dark"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
