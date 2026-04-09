import { CompetitionRepository } from "@/lib/repositories/competition.repository";
import { competitionSchema } from "@/lib/validations";
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

  static async createCompetition(data: any) {
    const validated = competitionSchema.parse(data);

    const newComp = {
      id: "cuid-" + crypto.randomBytes(8).toString("hex"),
      title: validated.title.trim(),
      description: validated.description?.trim() || "",
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
