"use client";

import { useState, useEffect } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { formatWhatsAppLink } from "@/lib/utils";
import Reveal from "@/components/Reveal";
import { fallbackFaqs, FaqItem } from "@/lib/faq-data";

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
    <section id="faq" className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Heading Area */}
        <Reveal>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-16">
          <div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-5xl lg:text-6xl font-black tracking-tighter uppercase">
              <span className="text-festika-teal">FREQUENTLY ASKED </span>
              <span className="text-festika-orange">QUESTIONS</span>
            </h2>
            <div className="w-16 h-1 bg-festika-teal mt-3" />
          </div>
          <p className="text-gray-500 text-sm lg:text-base lg:text-right max-w-sm">
            Punya pertanyaan? Temukan jawabannya di sini.
          </p>
        </div>
        </Reveal>

        {/* Accordion List */}
        <div className="space-y-6">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal key={item.id} delay={index * 80}>
              <div 
                key={item.id}
                className={`
                  border-2 border-festika-navy transition-all duration-300
                  ${isOpen ? "bg-festika-peach/10 shadow-none translate-x-[2px] translate-y-[2px]" : "bg-white shadow-[4px_4px_0_0_#0F2A36] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"}
                `}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
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
                
                <div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  className={`
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
