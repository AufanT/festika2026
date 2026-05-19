import type { Metadata } from "next";
import StaffView from "@/components/staff/StaffView";
import Reveal from "@/components/Reveal";
import { DivisionService } from "@/lib/services/division.service";
import { StaffService } from "@/lib/services/staff.service";

export const metadata: Metadata = {
  title: "Our Staff — FESTIKA UA 2026",
  description: "Daftar susunan kepanitiaan Festival Informatika.",
};

export default async function StaffPage() {
  const [divisions, coreLeaders] = await Promise.all([
    DivisionService.getAllDivisions(),
    StaffService.getCoreLeaders(),
  ]);

  return (
    <div className="min-h-screen bg-white">
      <Reveal>
      {/* Header */}
      <div className="text-center py-12 bg-white">
        <h1 
          className="font-[family-name:var(--font-space-grotesk)] text-5xl md:text-6xl font-black text-festika-orange uppercase tracking-tighter mx-auto"
          style={{ textShadow: "4px 4px 0 #0F2A36" }}
        >
          Our<br/>Staff!
        </h1>
      </div>
      </Reveal>
      
      {/* Container */}
      <Reveal><StaffView divisions={divisions} coreLeaders={coreLeaders} /></Reveal>
    </div>
  );
}
