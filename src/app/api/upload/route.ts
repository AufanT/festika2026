import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  console.log("[API Upload] Menerima request POST...");
  try {
    const session = await auth();

    if (!session) {
      console.warn("[API Upload] Unauthorized attempt");
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      console.warn("[API Upload] No file in formData");
      return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
    }

    console.log(`[API Upload] Memproses file: ${file.name} (${file.type}, ${file.size} bytes)`);

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ success: false, message: "Must be an image" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert Buffer to Base64 for a more stable upload in Serverless/App Router
    const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

    console.log("[API Upload] Mengirim data ke Cloudinary (Base64 method)...");
    
    // Direct upload using Base64 string
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "festika-uploads",
      resource_type: "auto",
    });

    if (!result?.secure_url) {
      console.error("[API Upload] Cloudinary response missing secure_url", result);
      throw new Error("Gagal mendapatkan URL dari Cloudinary");
    }

    console.log("[API Upload] Berhasil! URL:", result.secure_url);

    // Return the Cloudinary URL
    return NextResponse.json({ success: true, url: result.secure_url });
  } catch (error: any) {
    console.error("[API Upload] Terjadi Kesalahan:", error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || "Failed to upload image" 
    }, { status: 500 });
  }
}
