"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqData = [
  {
    question: "Apa itu Festika?",
    answer: "Festival Informatika (yang disingkat sebagai Festika) merupakan sebuah festival komputer tahunan oleh Himpunan Mahasiswa Informatika Universitas Andalas yang bertujuan untuk meningkatkan minat dan bakat peserta dalam teknologi informasi."
  },
  {
    question: "Siapa saja yang bisa mengikuti kompetisi di Festika?",
    answer: "Kompetisi di Festika tahun ini berskala lokal dan diperuntukkan khusus bagi mahasiswa aktif di kota Padang."
  },
  {
    question: "Apa saja lomba yang ada di Festika 2026?",
    answer: "Festika menghadirkan berbagai kompetisi menarik. Untuk daftar lengkap cabang perlombaan beserta tema dan deskripsinya, kamu bisa melihatnya langsung pada bagian 'Competitions' di halaman utama ini."
  },
  {
    question: "Bagaimana alur pendaftaran kompetisinya?",
    answer: "Peserta dapat melihat informasi awal kompetisi pada bagian 'Competitions'. Dengan mengklik kartu lomba yang diminati, kamu akan diarahkan ke halaman detail lomba yang memuat persyaratan lengkap dan tautan untuk melakukan pendaftaran."
  },
  {
    question: "Apakah ada biaya pendaftaran?",
    answer: "Biaya pendaftaran bervariasi untuk tiap cabang lomba. Informasi detail mengenai biaya dan metode pembayaran dapat dilihat di buku panduan (guidebook) masing-masing kompetisi."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white border-b border-gray-100">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Heading Area */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl lg:text-5xl font-extrabold tracking-wider uppercase">
              <span className="text-festika-teal">FREQUENTLY ASKED </span>
              <span className="text-festika-orange">QUESTIONS</span>
            </h2>
            <div className="w-16 h-1 bg-festika-teal mt-3" />
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm lg:text-base">
            <HelpCircle size={20} className="text-festika-orange" />
            <p>Punya pertanyaan? Temukan jawabannya di sini.</p>
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-6">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={`
                  border-2 border-festika-navy transition-all duration-300
                  ${isOpen ? "bg-festika-peach/10 shadow-none translate-x-[2px] translate-y-[2px]" : "bg-white shadow-[4px_4px_0_0_#0F2A36] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"}
                `}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group"
                >
                  <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-lg md:text-xl text-festika-navy group-hover:text-festika-teal transition-colors">
                    {item.question}
                  </span>
                  <div className={`
                    shrink-0 w-8 h-8 border-2 border-festika-navy flex items-center justify-center transition-all duration-300
                    ${isOpen ? "bg-festika-orange text-white" : "bg-white text-festika-navy group-hover:bg-gray-50"}
                  `}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>
                
                <div className={`
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
                `}>
                  <div className="px-6 pb-6 pt-0 border-t-2 border-dashed border-gray-100 mt-0">
                    <p className="text-gray-600 leading-relaxed text-base md:text-lg pt-4">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Help */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-6 font-medium">Masih punya pertanyaan lainnya?</p>
          <a 
            href="/#contact" 
            className="inline-flex items-center gap-2 bg-festika-teal text-white border-2 border-festika-navy px-8 py-3 font-bold shadow-[4px_4px_0_0_#F5A623] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </section>
  );
}
