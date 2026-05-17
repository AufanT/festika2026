import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4" style={{ background: "linear-gradient(135deg, #0F2A36 0%, #1A3A4D 50%, #0F2A36 100%)" }}>
      <div className="relative w-full max-w-md">
        <div className="border-2 border-festika-navy bg-white p-8 shadow-[8px_8px_0_0_#F5A623]">
          <div className="absolute right-0 top-0 size-8 bg-festika-orange" />
          <div className="text-center">
            <p className="font-heading text-8xl font-black text-festika-orange">404</p>
            <h1 className="mt-2 font-heading text-xl font-bold text-festika-navy">
              Halaman Tidak Ditemukan
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Halaman yang Anda cari tidak ada atau telah dipindahkan.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block bg-festika-navy px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#1A3A4D]"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
