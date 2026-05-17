import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { ApiResponse } from "@/lib/api-response";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return ApiResponse.error("Unauthorized", 401);

    const formData = await req.formData();
    const file = formData.get("file") as any;

    if (!file) {
      return ApiResponse.error("File tidak ditemukan", 400);
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "festika/past-events", resource_type: "image" },
        (err: any, res: any) => {
          if (err) return reject(err);
          resolve(res);
        },
      );
      stream.end(buffer);
    });

    return ApiResponse.success(result, "Upload berhasil", 201);
  } catch (err: any) {
    console.error("Cloudinary upload error:", err);
    return ApiResponse.error(err?.message || "Gagal mengupload file", 500);
  }
}
