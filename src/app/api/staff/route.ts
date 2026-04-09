import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { StaffService } from "@/lib/services/staff.service";
import { ApiResponse } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const divisionId = searchParams.get("divisionId");
    
    let data;
    if (divisionId === "core") {
      data = await StaffService.getCoreLeaders();
    } else if (divisionId) {
      data = await StaffService.getStaffByDivision(divisionId);
    } else {
      return ApiResponse.error("Parameter divisionId wajib disertakan (gunakan 'core' untuk pimpinan inti)", 400);
    }

    return ApiResponse.success(data);
  } catch (error: any) {
    console.error("Error fetching staff:", error);
    return ApiResponse.error("Gagal mengambil data staff", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return ApiResponse.error("Unauthorized", 401);
    }

    const body = await req.json();
    const data = await StaffService.createStaff(body);

    return ApiResponse.success(data, "Anggota berhasil ditambahkan!", 201);
  } catch (error: any) {
    console.error("Error creating staff:", error);
    return ApiResponse.error(error.message || "Gagal membuat staff", 500);
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
      return ApiResponse.error("ID anggota wajib disertakan", 400);
    }

    await StaffService.deleteStaff(id);
    return ApiResponse.success(null, "Anggota berhasil dihapus!");
  } catch (error: any) {
    console.error("Error deleting staff:", error);
    return ApiResponse.error(error.message || "Gagal menghapus anggota", 500);
  }
}
