import { v2 as cloudinary } from "cloudinary";

// Cek kredensial di level module (Server-side)
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.warn("WARNING: Cloudinary credentials are not fully set in environment variables!");
}

// Konfigurasi Cloudinary menggunakan v2
cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

export default cloudinary;

/**
 * Fungsi helper untuk mengunggah file gambar ke Cloudinary
 */
export async function uploadImage(fileBuffer: Buffer, folder: string = "festika") {
  return new Promise((resolve, reject) => {
    console.log(`[Cloudinary] Memulai upload stream ke folder: ${folder}...`);
    
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          console.error("[Cloudinary] Upload Stream Error:", error);
          reject(error);
        } else {
          console.log("[Cloudinary] Upload Stream Berhasil!");
          resolve(result);
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
}
