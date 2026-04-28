import { Trophy, Link, Info } from "lucide-react";

type StatsProps = {
  totalCompetitions: number;
  activeLinks: number;
};

export default function StatsOverview({ totalCompetitions, activeLinks }: StatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
      <div className="bg-white border-2 border-festika-navy shadow-[4px_4px_0_0_#F5A623] p-5">
        <Trophy size={20} className="text-festika-orange mb-3" />
        <p className="text-gray-500 text-xs uppercase font-semibold">Total Lomba</p>
        <p className="font-[family-name:var(--font-space-grotesk)] text-4xl font-extrabold text-festika-navy mt-1">
          {totalCompetitions}
        </p>
      </div>
      <div className="bg-white border-2 border-festika-navy shadow-[4px_4px_0_0_#1A6B73] p-5">
        <Link size={20} className="text-festika-teal mb-3" />
        <p className="text-gray-500 text-xs uppercase font-semibold">Link Google Form</p>
        <p className="font-[family-name:var(--font-space-grotesk)] text-4xl font-extrabold text-festika-navy mt-1">
          {activeLinks}
        </p>
      </div>
      <div className="bg-white border-2 border-festika-navy shadow-[4px_4px_0_0_#0F2A36] p-5">
        <Info size={20} className="text-festika-navy mb-3" />
        <p className="text-gray-500 text-xs uppercase font-semibold">Status Sistem</p>
        <p className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-festika-navy mt-1 uppercase">
          External
        </p>
      </div>
    </div>
  );
}
