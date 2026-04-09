import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";

// Load .env
dotenv.config({ path: path.join(process.cwd(), ".env") });

console.log("--- Cloudinary Test Configuration ---");
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME ? "Terisi" : "KOSONG");
console.log("API Key:", process.env.CLOUDINARY_API_KEY ? "Terisi" : "KOSONG");
console.log("API Secret:", process.env.CLOUDINARY_API_SECRET ? "Terisi" : "KOSONG");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function testUpload() {
  console.log("\n--- Mengetes Upload Gambar ---");
  
  // Gunakan buffer kosong atau file dummy untuk mengetes koneksi
  try {
    const result = await cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/sample.jpg", {
      folder: "test-connection",
    });
    console.log("CEK: Berhasil konek ke Cloudinary!");
    console.log("URL Hasil:", result.secure_url);
    console.log("--- TES BERHASIL ---\n");
  } catch (error) {
    console.error("CEK: Gagal konek ke Cloudinary!");
    console.error("Detail Error:", error);
    console.log("--- TES GAGAL ---\n");
  }
}

testUpload();
