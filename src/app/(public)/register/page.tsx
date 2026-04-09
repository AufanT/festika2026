import { Suspense } from "react";
import RegisterContainer from "./RegisterContainer";
import { CompetitionRepository } from "@/lib/repositories/competition.repository";

export default async function RegisterPage() {
  // Fetch competitions on the server
  const competitions = await CompetitionRepository.findAll();

  return (
    <>
      <main 
        className="flex-1 min-h-screen pt-24 pb-20 relative"
        style={{
          background: "linear-gradient(135deg, #FFF8F0 0%, #FDE8CF 100%)",
        }}
      >
        {/* Background decorative elements */}
        <div className="absolute top-40 left-10 w-32 h-32 border-4 border-festika-teal rounded-full opacity-10" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-festika-orange opacity-20 rotate-45" />

        <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block border border-festika-teal rounded-full px-5 py-1.5 text-xs font-semibold text-festika-teal tracking-wider uppercase mb-5">
              Registration
            </span>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl lg:text-5xl font-extrabold text-festika-teal mb-4">
              Join <span className="text-festika-orange">Festika 2026</span>
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              Siapkan dirimu untuk festival IT terbesar tahun ini. Pilih lomba yang ingin kamu ikuti dan isi formulir pendaftaran dengan data yang valid.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Suspense fallback={<div className="text-center p-12 text-festika-navy">Memuat formulir...</div>}>
              <RegisterContainer competitions={competitions} />
            </Suspense>
          </div>
        </div>
      </main>
    </>
  );
}
