"use client";

import { useState, useEffect } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { formatWhatsAppLink } from "@/lib/utils";
import Reveal from "@/components/Reveal";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

const fallbackFaqs: FaqItem[] = [
  {
    id: "1",
    question: "Apa itu Festika 2026?",
    answer:
      'FESTIKA 2026 adalah festival tahunan yang menjadi wadah kompetisi sekaligus pengembangan potensi di bidang teknologi digital. Tahun ini, FESTIKA mengusung tema besar "NextGen Tech: Creating the Future Today".',
  },
  {
    id: "2",
    question: "Siapa saja yang bisa mengikuti kompetisi di Festika?",
    answer:
      "Ketentuan peserta bergantung pada jenis lomba yang diikuti:\n\nLomba Karya Tulis Ilmiah (KTI): Terbuka untuk pelajar SMA/sederajat, baik secara individu maupun tim.\n\nCapture The Flag (CTF): Terbuka untuk pelajar SMA/sederajat dalam bentuk tim yang terdiri dari 3 orang.\n\nDesain Web: Peserta mengerjakan proyek secara individu.",
  },
  {
    id: "3",
    question: "Apa saja lomba yang ada di Festika 2026?",
    answer:
      "Terdapat tiga kategori lomba utama tahun ini:\n\n1. Desain Web: Kompetisi merancang antarmuka website yang kreatif dan responsif.\n\n2. Lomba Karya Tulis Ilmiah (KTI): Kompetisi inovasi dan penelitian ilmiah bertema tantangan era digital.\n\n3. Capture The Flag (CTF): Kompetisi di bidang keamanan siber menggunakan platform picoCTF.",
  },
  {
    id: "4",
    question: "Bagaimana alur pendaftaran kompetisinya?",
    answer:
      "Pendaftaran dilakukan secara online dalam rentang waktu berikut:\n\n- Desain Web: 27 April – 12 Mei 2026.\n- KTI: 27 April – 15 Mei 2026.\n- CTF: 27 Maret – 14 Mei 2026.\n\nSetelah mendaftar, peserta akan mengikuti rangkaian babak penyisihan secara online sebelum terpilih untuk maju ke babak final secara offline pada 23–24 Mei 2026.",
  },
  {
    id: "5",
    question: "Apakah ada biaya pendaftaran?",
    answer:
      "- Desain Web & KTI: Gratis (tidak dipungut biaya).\n- Capture The Flag (CTF): Biaya pendaftaran sebesar Rp100.000 per tim.",
  },
];

function renderAnswer(text: string) {
  return text.split("\n\n").map((paragraph, i) => (
    <p key={i} className="mb-2 last:mb-0">
      {paragraph.split("\n").map((line, j) => (
        <span key={j}>
          {line}
          {j < paragraph.split("\n").length - 1 && <br />}
        </span>
      ))}
    </p>
  ));
}

export default function FaqSection() {
  const [faqs, setFaqs] = useState<FaqItem[]>(fallbackFaqs);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/faqs")
      .then((res) => res.json())
      .then((json) => {
        if (json.data && json.data.length > 0) {
          setFaqs(json.data);
        }
      })
      .catch(() => {
        /* fallback to hardcoded */
      });
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white border-b border-gray-100">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Heading Area */}
        <Reveal>
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
        </Reveal>

        {/* Accordion List */}
        <div className="space-y-6">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal key={item.id} delay={index * 80}>
              <div 
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
                      {renderAnswer(item.answer)}
                    </div>
                  </div>
                </div>
              </div>
              </Reveal>
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
