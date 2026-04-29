import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { CompetitionRepository } from "@/lib/repositories/competition.repository";
import { ApiResponse } from "@/lib/api-response";

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return ApiResponse.error("Unauthorized", 401);
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return ApiResponse.error("ID lomba wajib disertakan", 400);
    }

    const body = await req.json();

    // Archive the competition
    await CompetitionRepository.update(id, {
      isArchived: body.isArchived,
      year: body.year || 2025,
      participants: body.participants || null,
      winner: body.winner || null,
      runnerUp: body.runnerUp || null,
      thirdPlace: body.thirdPlace || null,
      galleryUrls: body.galleryUrls || null,
    });

    return ApiResponse.success(null, "Lomba berhasil diarsipkan!");
  } catch (error: any) {
    console.error("Error archiving competition:", error);
    return ApiResponse.error(error.message || "Gagal mengarsipkan lomba", 500);
  }
}
