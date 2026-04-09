import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { RegistrantService } from "@/lib/services/registrant.service";
import { ApiResponse } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
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
