import { CompetitionService } from "@/lib/services/competition.service";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Trophy, Calendar, Link as LinkIcon, MessageSquare, ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CompetitionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let competition;
  try {
    competition = await CompetitionService.getCompetitionById(id);
  } catch (error) {
    return notFound();
  }

  const startDate = competition.registrationStartDate ? new Date(competition.registrationStartDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : null;
  const endDate = competition.registrationEndDate ? new Date(competition.registrationEndDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : null;

  return (
    <div className="min-h-screen bg-gray-50 font-[family-name:var(--font-plus-jakarta-sans)]">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          {/* Breadcrumb / Back */}
          <Link href="/#competitions" className="inline-flex items-center gap-2 text-gray-500 hover:text-festika-navy mb-8 transition-colors group">
            <div className="w-8 h-8 border-2 border-gray-200 flex items-center justify-center group-hover:border-festika-navy transition-colors">
              <ArrowLeft size={16} />
            </div>
            <span className="text-sm font-bold uppercase tracking-widest">Kembali ke Daftar Lomba</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: Info & Description */}
            <div className="lg:col-span-2 space-y-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-festika-orange/10 px-3 py-1 border border-festika-orange/20">
                  <Sparkles size={14} className="text-festika-orange" />
                  <span className="text-[10px] font-black text-festika-orange uppercase tracking-widest">Competition 2026</span>
                </div>
                <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl lg:text-6xl font-black text-festika-navy leading-none uppercase">
                  {competition.title}
                </h1>
                {competition.theme && (
                  <p className="text-festika-teal text-lg lg:text-xl font-bold italic">
                    "{competition.theme}"
                  </p>
                )}
              </div>

              {/* Poster Image */}
              {competition.imageUrl && (
                <div className="border-4 border-festika-navy shadow-[12px_12px_0_0_#0F2A36] overflow-hidden bg-white">
                  <img src={competition.imageUrl} alt={competition.title} className="w-full h-auto" />
                </div>
              )}

              {/* Description Section */}
              <div className="bg-white border-2 border-festika-navy p-8 lg:p-10 shadow-[8px_8px_0_0_#F5A623]">
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-black text-festika-navy mb-6 uppercase border-b-4 border-festika-orange inline-block">
                  Deskripsi Lomba
                </h3>
                <div className="prose prose-festika max-w-none">
                  <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">
                    {competition.description || "Detail lomba belum tersedia."}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Sidebar with CTA & Details */}
            <div className="space-y-8">
              <div className="sticky top-28 space-y-8">
                {/* Registration Card */}
                <div className="bg-festika-navy p-8 text-white border-4 border-festika-navy shadow-[8px_8px_0_0_#14B8A6]">
                  <h4 className="font-black uppercase tracking-widest text-xs text-festika-teal mb-6">Pendaftaran</h4>
                  
                  <div className="space-y-6 mb-8">
                    <div className="flex items-start gap-4">
                      <Calendar className="text-festika-orange shrink-0" size={24} />
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Periode</p>
                        <p className="font-bold text-sm">
                          {startDate || "?"} — {endDate || "Selesai"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <a 
                    href={competition.registrationLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <button className="w-full bg-festika-orange hover:bg-white hover:text-festika-navy text-white px-6 py-4 font-black uppercase tracking-widest text-sm border-2 border-white transition-all flex items-center justify-center gap-3">
                      Daftar Sekarang
                      <LinkIcon size={18} />
                    </button>
                  </a>
                  <p className="text-[10px] text-center text-gray-400 mt-4 font-medium italic">
                    *Anda akan diarahkan ke Google Form eksternal
                  </p>
                </div>

                {/* Contact Persons */}
                {competition.contacts && Array.isArray(competition.contacts) && competition.contacts.length > 0 && (
                  <div className="bg-white border-2 border-festika-navy p-8">
                    <h4 className="font-black uppercase tracking-widest text-xs text-festika-navy mb-6 border-b-2 border-festika-teal inline-block">Contact Person</h4>
                    <div className="space-y-4">
                      {competition.contacts.map((cp: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between group">
                          <div>
                            <p className="font-bold text-festika-navy text-sm">{cp.name}</p>
                            <p className="text-xs text-gray-500">{cp.phone}</p>
                          </div>
                          <a 
                            href={`https://wa.me/${cp.phone.replace(/[^0-9]/g, '')}`} 
                            target="_blank" 
                            className="w-10 h-10 bg-gray-100 flex items-center justify-center text-festika-navy hover:bg-festika-teal hover:text-white transition-colors border border-gray-200"
                          >
                            <MessageSquare size={18} />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {competition.tags && (
                  <div className="flex flex-wrap gap-2">
                    {competition.tags.split(/[ ,#]+/).filter((t: string) => t).map((tag: string, idx: number) => (
                      <span key={idx} className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-1 border border-gray-200 uppercase tracking-tighter">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
