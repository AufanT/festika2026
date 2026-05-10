"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import GuidebookButton from "@/components/GuidebookButton";

export default function HeroButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-5 mt-10 justify-center lg:justify-start">
      <Link href="/#competitions">
        <Button
          className="bg-festika-orange hover:bg-festika-orange-light text-white rounded-none px-8 h-12 text-base font-bold border-2 border-festika-navy shadow-[4px_4px_0_0_#0F2A36] hover:shadow-[0_0_15px_rgba(245,166,35,0.6)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer gap-2"
        >
          Join the Festival
          <ArrowRight size={18} />
        </Button>
      </Link>
      <GuidebookButton />
    </div>
  );
}
