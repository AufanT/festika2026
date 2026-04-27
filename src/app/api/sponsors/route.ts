import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { SponsorService } from "@/lib/services/sponsor.service";
import { ApiResponse } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const data = await SponsorService.getAllSponsors();
    return ApiResponse.success(data);
  } catch (error: any) {
    console.error("Error fetching sponsors:", error);
    return ApiResponse.error("Gagal mengambil data sponsor", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return ApiResponse.error("Unauthorized", 401);
    }

    const body = await req.json();
    const data = await SponsorService.createSponsor(body);

    return ApiResponse.success(data, "Sponsor berhasil ditambahkan!", 201);
  } catch (error: any) {
    console.error("Error creating sponsor:", error);
    return ApiResponse.error(error.message || "Gagal membuat sponsor", 500);
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
      return ApiResponse.error("ID sponsor wajib disertakan", 400);
    }

    await SponsorService.deleteSponsor(id);
    return ApiResponse.success(null, "Sponsor berhasil dihapus!");
  } catch (error: any) {
    console.error("Error deleting sponsor:", error);
    return ApiResponse.error(error.message || "Gagal menghapus sponsor", 500);
  }
}
