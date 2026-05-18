import { NextResponse } from "next/server";
import { SettingService } from "@/lib/services/setting.service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await SettingService.getAllSettings();
    const guidebookUrl = (settings as any)?.guidebook_url;

    if (!guidebookUrl) {
      return NextResponse.json(
        { success: false, message: "Guidebook belum diupload" },
        { status: 404 }
      );
    }

    const response = await fetch(guidebookUrl);

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: "Gagal mengambil file guidebook" },
        { status: 502 }
      );
    }

    const blob = await response.blob();
    const filename = "Guidebook FESTIKA 2026.pdf";

    return new NextResponse(blob, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": blob.size.toString(),
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("[Guidebook Download] Error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan" },
      { status: 500 }
    );
  }
}
