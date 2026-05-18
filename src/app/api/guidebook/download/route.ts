import { NextResponse } from "next/server";
import { SettingService } from "@/lib/services/setting.service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await SettingService.getAllSettings();
    const guidebookUrl = (settings as any)?.guidebook_url;

    if (!guidebookUrl) {
      // Tampilkan halaman HTML sederhana kalo guidebook belum tersedia
      return new NextResponse(
        `<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><title>Guidebook Belum Tersedia</title></head>
<body style="font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#0F2A36;color:white;text-align:center;padding:20px;">
  <div>
    <h1 style="font-size:1.5rem;margin-bottom:1rem;">📖 Guidebook Belum Tersedia</h1>
    <p style="color:#94a3b8;">Guidebook FESTIKA 2026 belum diupload oleh admin. Silakan cek kembali nanti.</p>
    <a href="/" style="display:inline-block;margin-top:1.5rem;padding:0.75rem 2rem;background:#F5A623;color:#0F2A36;text-decoration:none;font-weight:bold;border-radius:0;">Kembali ke Beranda</a>
  </div>
</body>
</html>`,
        {
          status: 404,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        }
      );
    }

    const cloudinaryResponse = await fetch(guidebookUrl);

    if (!cloudinaryResponse.ok) {
      return new NextResponse(
        `<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><title>Gagal Mengunduh</title></head>
<body style="font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#0F2A36;color:white;text-align:center;padding:20px;">
  <div>
    <h1 style="font-size:1.5rem;margin-bottom:1rem;">❌ Gagal Mengunduh Guidebook</h1>
    <p style="color:#94a3b8;">Terjadi kesalahan saat mengambil file guidebook. Silakan coba lagi nanti.</p>
    <a href="/" style="display:inline-block;margin-top:1.5rem;padding:0.75rem 2rem;background:#F5A623;color:#0F2A36;text-decoration:none;font-weight:bold;border-radius:0;">Kembali ke Beranda</a>
  </div>
</body>
</html>`,
        {
          status: 502,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        }
      );
    }

    const filename = "Guidebook FESTIKA 2026.pdf";

    // Stream response langsung dari Cloudinary tanpa buffer di memory
    return new NextResponse(cloudinaryResponse.body, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
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
