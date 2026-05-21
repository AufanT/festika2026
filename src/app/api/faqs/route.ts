import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { FaqService } from "@/lib/services/faq.service";
import { ApiResponse } from "@/lib/api-response";

export async function GET() {
  try {
    const data = await FaqService.getAllFaqs();
    return ApiResponse.success(data);
  } catch (error: any) {
    return ApiResponse.error(error.message || "Gagal mengambil data FAQ", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return ApiResponse.error("Unauthorized", 401);

    const body = await req.json();
    const data = await FaqService.createFaq(body);

    return ApiResponse.success(data, "FAQ berhasil ditambahkan!", 201);
  } catch (error: any) {
    return ApiResponse.error(error.message || "Gagal menambahkan FAQ", 400);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return ApiResponse.error("Unauthorized", 401);

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return ApiResponse.error("ID FAQ wajib disertakan", 400);

    const body = await req.json();
    await FaqService.updateFaq(id, body);

    return ApiResponse.success(null, "FAQ berhasil diperbarui");
  } catch (error: any) {
    return ApiResponse.error(error.message || "Gagal memperbarui FAQ", 400);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return ApiResponse.error("Unauthorized", 401);

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return ApiResponse.error("ID FAQ wajib disertakan", 400);

    await FaqService.deleteFaq(id);
    return ApiResponse.success(null, "FAQ berhasil dihapus");
  } catch (error: any) {
    return ApiResponse.error(error.message || "Gagal menghapus FAQ", 500);
  }
}
