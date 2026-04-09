import { DivisionRepository } from "@/lib/repositories/division.repository";
import crypto from "crypto";

export class DivisionService {
  static async getAllDivisions() {
    return await DivisionRepository.findAll();
  }

  static async createDivision(data: { name: string; imageUrl?: string | null }) {
    if (!data.name || data.name.trim() === "") {
      throw new Error("Nama divisi wajib diisi");
    }

    const newDiv = {
      id: "div-" + crypto.randomBytes(8).toString("hex"),
      name: data.name.trim(),
      imageUrl: data.imageUrl || null,
      orderIndex: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return await DivisionRepository.create(newDiv);
  }
}
