import { Users, GraduationCap, Calendar } from "lucide-react";

type StatsProps = {
  totalRegistrants: number;
  topMajor?: string;
  topYear?: string;
};

export default function StatsOverview({ totalRegistrants, topMajor, topYear }: StatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
      <div className="bg-white border-2 border-festika-navy shadow-[4px_4px_0_0_#F5A623] p-5">
        <Users size={20} className="text-festika-orange mb-3" />
        <p className="text-gray-500 text-xs uppercase font-semibold">Total Pendaftar</p>
        <p className="font-[family-name:var(--font-space-grotesk)] text-4xl font-extrabold text-festika-navy mt-1">
          {totalRegistrants}
        </p>
      </div>
      <div className="bg-white border-2 border-festika-navy shadow-[4px_4px_0_0_#1A6B73] p-5">
        <GraduationCap size={20} className="text-festika-teal mb-3" />
        <p className="text-gray-500 text-xs uppercase font-semibold">Jurusan Terbanyak</p>
        <p className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-festika-navy mt-1 truncate">
          {topMajor || "-"}
        </p>
      </div>
      <div className="bg-white border-2 border-festika-navy shadow-[4px_4px_0_0_#0F2A36] p-5">
        <Calendar size={20} className="text-festika-navy mb-3" />
        <p className="text-gray-500 text-xs uppercase font-semibold">Angkatan Terbanyak</p>
        <p className="font-[family-name:var(--font-space-grotesk)] text-4xl font-extrabold text-festika-navy mt-1">
          {topYear || "-"}
        </p>
      </div>
    </div>
  );
}
