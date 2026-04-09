import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex-1 min-h-screen flex flex-col items-center justify-center bg-[#FFF8F0]">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-festika-teal/10 animate-ping" />
        <Loader2 className="relative z-10 animate-spin text-festika-teal" size={48} />
      </div>
      <p className="mt-6 font-[family-name:var(--font-space-grotesk)] font-bold text-festika-navy animate-pulse tracking-widest uppercase text-sm">
        Memuat Festika 2026...
      </p>
    </div>
  );
}
