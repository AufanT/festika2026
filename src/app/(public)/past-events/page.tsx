"use client";

import { useState, useEffect } from "react";
import { Zap, Loader, Calendar } from "lucide-react";
import PastEventCard from "@/components/PastEventCard";
import PastEventModal from "@/components/PastEventModal";
import Reveal from "@/components/Reveal";

interface PastEvent {
  id: string;
  title: string;
  theme?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  year: number;
  participants?: number | null;
  winner?: string | null;
  runnerUp?: string | null;
  thirdPlace?: string | null;
  galleryUrls?: string[];
  registrationStartDate?: Date | string | null;
  registrationEndDate?: Date | string | null;
}

export default function PastEventsPage() {
  const [events, setEvents] = useState<PastEvent[]>([]);
  const [groupedEvents, setGroupedEvents] = useState<{
    [key: number]: PastEvent[];
  }>({});
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<PastEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPastEvents = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/past-events");
        const json = await res.json();
        const payload = json.data;
        const allEvents = Array.isArray(payload)
          ? payload
          : payload?.events || [];

        // Group events by year
        const grouped: { [key: number]: PastEvent[] } = {};
        allEvents.forEach((event: PastEvent) => {
          const year = event.year || new Date().getFullYear() - 1;
          if (!grouped[year]) {
            grouped[year] = [];
          }
          grouped[year].push(event);
        });

        // Sort years descending (newest first)
        const sortedYears = Object.keys(grouped)
          .map(Number)
          .sort((a, b) => b - a);

        // Default to most recent year
        const defaultYear = sortedYears.length > 0 ? sortedYears[0] : null;

        setGroupedEvents(grouped);
        setYears(sortedYears);
        setSelectedYear(defaultYear);
        setEvents(defaultYear ? grouped[defaultYear] || [] : []);
      } catch (error) {
        console.error("Error fetching past events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPastEvents();
  }, []);

  const handleEventClick = (event: PastEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setEvents(groupedEvents[year] || []);
  };

  // Calculate the previous year from current date
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;

  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Section */}
        <section className="mb-16">
          <div className="mb-8">
            <Reveal delay={0}>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-festika-orange flex items-center justify-center">
                  <Zap size={24} className="text-white" />
                </div>
              </div>
              <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl lg:text-5xl font-extrabold text-festika-teal uppercase tracking-wider">
                Past Events
              </h1>
            </div>
            </Reveal>
            <Reveal delay={100}>
            <div className="w-12 h-1 bg-festika-orange mb-4" />
            </Reveal>
            <Reveal delay={150}>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl lg:text-3xl font-bold text-festika-navy uppercase tracking-tight mb-4">
              Lihat Kesuksesan Kami
            </h2>
            </Reveal>
            <Reveal delay={200}>
            <p className="text-gray-600 max-w-2xl text-base lg:text-lg leading-relaxed font-medium">
              Berikut adalah acara-acara FESTIKA dari tahun-tahun sebelumnya.
              Jadilah bagian dari kesuksesan kami di tahun {currentYear}!
            </p>
            </Reveal>
          </div>

          {/* Year Filter Tabs */}
          {years.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-8">
              {years.map((year) => (
                <Reveal key={year} delay={0}>
                <button
                  onClick={() => handleYearChange(year)}
                  className={`px-6 py-3 border-2 font-bold transition-all flex items-center gap-2 ${
                    selectedYear === year
                      ? "bg-festika-teal border-festika-teal text-white shadow-[4px_4px_0_0_#0F2A36]"
                      : "bg-white border-festika-navy text-festika-navy hover:bg-festika-teal/10"
                  }`}
                >
                  <Calendar size={18} />
                  FESTIKA {year}
                </button>
                </Reveal>
              ))}
            </div>
          )}

          {/* Summary Stats (moved to top) */}
          {!isLoading && selectedYear !== null && (
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Reveal delay={0}>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-4 border-blue-300 p-6 text-center">
                  <p className="text-[10px] font-black text-blue-700 uppercase tracking-widest mb-2">
                    Total Acara
                  </p>
                  <p className="text-3xl font-black text-blue-900">
                    {(groupedEvents[selectedYear] || []).length}
                  </p>
                </div>
                </Reveal>
                <Reveal delay={100}>
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-4 border-yellow-300 p-6 text-center">
                  <p className="text-[10px] font-black text-yellow-700 uppercase tracking-widest mb-2">
                    Total Peserta
                  </p>
                  <p className="text-3xl font-black text-yellow-900">
                    {(
                      (groupedEvents[selectedYear] || []).reduce(
                        (acc, e) => acc + (e.participants || 0),
                        0,
                      ) || 0
                    ).toLocaleString()}
                  </p>
                </div>
                </Reveal>
                <Reveal delay={200}>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-4 border-orange-300 p-6 text-center">
                  <p className="text-[10px] font-black text-orange-700 uppercase tracking-widest mb-2">
                    Tahun
                  </p>
                  <p className="text-3xl font-black text-orange-900">
                    {selectedYear}
                  </p>
                </div>
                </Reveal>
              </div>
            </div>
          )}
        </section>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader size={40} className="text-festika-teal animate-spin mb-4" />
            <p className="text-gray-500 font-semibold">
              Memuat acara tahun lalu...
            </p>
          </div>
        )}

        {/* Events Grid */}
        {!isLoading && events.length > 0 && (
          <div>
            <Reveal>
            <div className="mb-8">
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-festika-navy uppercase tracking-tight mb-2">
                📊 FESTIKA {selectedYear}
              </h3>
              <p className="text-gray-500 text-sm">
                {events.length} acara telah dilaksanakan pada tahun{" "}
                {selectedYear}
              </p>
            </div>
            </Reveal>

            <div className="grid grid-cols-1 gap-8 mb-12">
              {events.map((event, i) => (
                <Reveal key={event.id} delay={i * 80}>
                <PastEventCard
                  event={event}
                  onDetailsClick={handleEventClick}
                />
                </Reveal>
              ))}
            </div>

            {/* Summary shown above */}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && events.length === 0 && (
          <div className="border-4 border-dashed border-gray-200 rounded-none py-20 text-center bg-gray-50">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-4">
              <Zap size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-400 font-black uppercase tracking-[0.5em] text-lg mb-2">
              Belum Ada Data
            </p>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              {years.length === 0
                ? `Acara-acara tahun ${previousYear} akan segera ditampilkan di sini. Pantau terus halaman ini untuk melihat kesuksesan FESTIKA!`
                : `Belum ada acara untuk tahun ${selectedYear}.`}
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <PastEventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </main>
  );
}
