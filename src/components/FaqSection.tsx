"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { formatWhatsAppLink } from "@/lib/utils";

const faqData = [
  {
    question: "Apa itu Festika 2026?",
    answer: (
      <>
        FESTIKA 2026 adalah festival tahunan yang menjadi wadah kompetisi sekaligus pengembangan potensi di bidang teknologi digital. Tahun ini, FESTIKA mengusung tema besar <span className="font-bold text-festika-navy">"NextGen Tech: Creating the Future Today"</span>.
      </>
    )
  },
  {
    question: "Siapa saja yang bisa mengikuti kompetisi di Festika?",
    answer: (
      <div className="space-y-4">
        <p>Ketentuan peserta bergantung pada jenis lomba yang diikuti:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <span className="font-bold text-festika-navy">Lomba Karya Tulis Ilmiah (KTI):</span> Terbuka untuk pelajar SMA/sederajat, baik secara individu maupun tim.
          </li>
          <li>
            <span className="font-bold text-festika-navy">Capture The Flag (CTF):</span> Terbuka untuk pelajar SMA/sederajat dalam bentuk tim yang terdiri dari 3 orang.
          </li>
          <li>
            <span className="font-bold text-festika-navy">Desain Web:</span> Peserta mengerjakan proyek secara individu.
          </li>
        </ul>
      </div>
    )
  },
  {
    question: "Apa saja lomba yang ada di Festika 2026?",
    answer: (
      <div className="space-y-4">
        <p>Terdapat tiga kategori lomba utama tahun ini:</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <span className="font-bold text-festika-navy">Desain Web:</span> Kompetisi merancang antarmuka <span className="italic">website</span> yang kreatif dan responsif.
          </li>
          <li>
            <span className="font-bold text-festika-navy">Lomba Karya Tulis Ilmiah (KTI):</span> Kompetisi inovasi dan penelitian ilmiah bertema tantangan era digital.
          </li>
          <li>
            <span className="font-bold text-festika-navy">Capture The Flag (CTF):</span> Kompetisi di bidang keamanan siber menggunakan <span className="italic">platform</span> picoCTF.
          </li>
        </ol>
      </div>
    )
  },
  {
    question: "Bagaimana alur pendaftaran kompetisinya?",
    answer: (
      <div className="space-y-4">
        <p>Pendaftaran dilakukan secara <span className="italic">online</span> dalam rentang waktu berikut:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <span className="font-bold text-festika-navy">Desain Web:</span> 27 April – 12 Mei 2026.
          </li>
          <li>
            <span className="font-bold text-festika-navy">KTI:</span> 27 April – 15 Mei 2026.
          </li>
          <li>
            <span className="font-bold text-festika-navy">CTF:</span> 27 Maret – 14 Mei 2026.
          </li>
        </ul>
        <p>Setelah mendaftar, peserta akan mengikuti rangkaian babak penyisihan secara <span className="italic">online</span> sebelum terpilih untuk maju ke babak final secara <span className="italic">offline</span> pada 23–24 Mei 2026.</p>
      </div>
    )
  },
  {
    question: "Apakah ada biaya pendaftaran?",
    answer: (
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <span className="font-bold text-festika-navy">Desain Web & KTI:</span> Gratis (tidak dipungut biaya).
        </li>
        <li>
          <span className="font-bold text-festika-navy">Capture The Flag (CTF):</span> Biaya pendaftaran sebesar Rp100.000 per tim.
        </li>
      </ul>
    )
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
                  <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-lg md:text-xl text-festika-navy group-hover:text-festika-teal transition-colors text-balance">
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
                  ${isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}
                `}>
                  <div className="px-6 pb-6 pt-0 border-t-2 border-dashed border-gray-100 mt-0">
                    <div className="text-gray-600 leading-relaxed text-base md:text-lg pt-4">
                      {item.answer}
                    </div>
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
            href={formatWhatsAppLink("+62-823-1148-8810", "Halo, saya ingin bertanya tentang Festika 2026.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-festika-teal text-white border-2 border-festika-navy px-8 py-3 font-bold shadow-[4px_4px_0_0_#F5A623] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </section>
  );
}
