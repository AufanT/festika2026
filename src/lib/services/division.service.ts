import { DivisionRepository } from "@/lib/repositories/division.repository";
import { divisionSchema } from "@/lib/validations";
import crypto from "crypto";

export class DivisionService {
  static async getAllDivisions() {
    return await DivisionRepository.findAll();
  }

  static async createDivision(data: any) {
    const validated = divisionSchema.parse(data);

    const newDiv = {
      id: "div-" + crypto.randomBytes(8).toString("hex"),
      name: validated.name.trim(),
      imageUrl: validated.imageUrl || null,
      orderIndex: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return await DivisionRepository.create(newDiv);
  }

  static async deleteDivision(id: string) {
    if (!id) throw new Error("ID divisi diperlukan");
    return await DivisionRepository.delete(id);
  }
}
