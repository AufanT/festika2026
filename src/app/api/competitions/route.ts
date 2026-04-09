import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { CompetitionService } from "@/lib/services/competition.service";
import { ApiResponse } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const data = await CompetitionService.getAllCompetitions();
    return ApiResponse.success(data);
  } catch (error: any) {
    console.error("Error fetching competitions:", error);
    return ApiResponse.error("Gagal mengambil data lomba", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return ApiResponse.error("Unauthorized", 401);
    }

    const body = await req.json();
    const data = await CompetitionService.createCompetition(body);

    return ApiResponse.success(data, "Lomba berhasil ditambahkan!", 201);
  } catch (error: any) {
    console.error("Error creating competition:", error);
    return ApiResponse.error(error.message || "Gagal membuat lomba", 500);
  }
}

export async function DELETE(req: NextRequest) {
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

    await CompetitionService.deleteCompetition(id);
    return ApiResponse.success(null, "Lomba berhasil dihapus!");
  } catch (error: any) {
    console.error("Error deleting competition:", error);
    return ApiResponse.error(error.message || "Gagal menghapus lomba", 500);
  }
}
