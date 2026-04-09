import { CompetitionRepository } from "@/lib/repositories/competition.repository";
import crypto from "crypto";

export class CompetitionService {
  static async getAllCompetitions() {
    return await CompetitionRepository.findAll();
  }

  static async getCompetitionById(id: string) {
    const competition = await CompetitionRepository.findById(id);
    if (!competition) throw new Error("Lomba tidak ditemukan");
    return competition;
  }

  static async createCompetition(data: { title: string; description?: string }) {
    if (!data.title || data.title.trim() === "") {
      throw new Error("Judul lomba wajib diisi");
    }

    const newComp = {
      id: "cuid-" + crypto.randomBytes(8).toString("hex"),
      title: data.title.trim(),
      description: data.description?.trim() || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return await CompetitionRepository.create(newComp);
  }
  static async deleteCompetition(id: string) {
    if (!id) throw new Error("ID lomba diperlukan");
    return await CompetitionRepository.delete(id);
  }
}
