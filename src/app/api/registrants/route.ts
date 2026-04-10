import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { RegistrantService } from "@/lib/services/registrant.service";
import { ApiResponse } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return ApiResponse.error("Unauthorized", 401);
    }

    const searchParams = req.nextUrl.searchParams;
    const competitionId = searchParams.get("competitionId") || undefined;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");

    const result = await RegistrantService.getAllRegistrants(competitionId, page, limit);

    return ApiResponse.success(result);
  } catch (error: any) {
    console.error("Error fetching registrants:", error);
    return ApiResponse.error("Gagal mengambil data pendaftar", 500);
  }
}
