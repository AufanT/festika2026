import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { DivisionService } from "@/lib/services/division.service";
import { ApiResponse } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const data = await DivisionService.getAllDivisions();
    return ApiResponse.success(data);
  } catch (error: any) {
    console.error("Error fetching divisions:", error);
    return ApiResponse.error("Gagal mengambil data divisi", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return ApiResponse.error("Unauthorized", 401);
    }

    const body = await req.json();
    const data = await DivisionService.createDivision(body);

    return ApiResponse.success(data, "Divisi berhasil ditambahkan!", 201);
  } catch (error: any) {
    console.error("Error creating division:", error);
    return ApiResponse.error(error.message || "Gagal membuat divisi", 500);
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
      return ApiResponse.error("ID divisi wajib disertakan", 400);
    }

    await DivisionService.deleteDivision(id);
    return ApiResponse.success(null, "Divisi berhasil dihapus!");
  } catch (error: any) {
    console.error("Error deleting division:", error);
    return ApiResponse.error(error.message || "Gagal menghapus divisi", 500);
  }
}
