import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { SettingService } from "@/lib/services/setting.service";
import { ApiResponse } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const data = await SettingService.getAllSettings();
    return ApiResponse.success(data);
  } catch (error: any) {
    console.error("Error fetching settings:", error);
    return ApiResponse.error("Gagal mengambil konfigurasi", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return ApiResponse.error("Unauthorized", 401);
    }

    const body = await req.json();
    await SettingService.updateSettings(body);

    // Revalidate the entire application so that changes to the settings 
    // are reflected in the public pages the next time they are loaded.
    revalidatePath("/", "layout");

    return ApiResponse.success(null, "Konfigurasi berhasil disimpan!");
  } catch (error: any) {
    console.error("Error updating settings:", error);
    return ApiResponse.error(error.message || "Gagal menyimpan konfigurasi", 500);
  }
}
