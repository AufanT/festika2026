import { NextRequest } from "next/server";
import { CompetitionRepository } from "@/lib/repositories/competition.repository";
import { ApiResponse } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const yearParam = searchParams.get("year");

    // Jika ada parameter year, gunakan. Jika tidak, ambil semua past events
    let data;
    if (yearParam) {
      const year = parseInt(yearParam);
      if (isNaN(year)) {
        return ApiResponse.error("Year harus berupa angka", 400);
      }
      // Filter by specific year
      const allPastEvents = await CompetitionRepository.findPastEvents();
      data = allPastEvents.filter((e: any) => e.year === year);
    } else {
      // Get all past events (all years)
      data = await CompetitionRepository.findPastEvents();
    }

    return ApiResponse.success(data);
  } catch (error: any) {
    console.error("Error fetching past events:", error);
    return ApiResponse.error("Gagal mengambil data acara tahun lalu", 500);
  }
}
