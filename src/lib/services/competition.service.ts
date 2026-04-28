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
      id: "comp-" + crypto.randomBytes(8).toString("hex"),
      title: validated.title.trim(),
      theme: validated.theme?.trim() || null,
      description: validated.description?.trim() || "",
      registrationStartDate: validated.registrationStartDate ? new Date(validated.registrationStartDate) : null,
      registrationEndDate: validated.registrationEndDate ? new Date(validated.registrationEndDate) : null,
      registrationLink: validated.registrationLink.trim(),
      contacts: validated.contacts || [],
      tags: validated.tags?.trim() || null,
      imageUrl: validated.imageUrl?.trim() || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return await CompetitionRepository.create(newComp);
  }

  static async updateCompetition(id: string, data: any) {
    if (!id) throw new Error("ID lomba diperlukan");
    const validated = competitionSchema.partial().parse(data);
    
    // Prepare data for repository
    const updateData: any = { ...validated };
    if (validated.registrationStartDate) updateData.registrationStartDate = new Date(validated.registrationStartDate);
    if (validated.registrationEndDate) updateData.registrationEndDate = new Date(validated.registrationEndDate);

    return await CompetitionRepository.update(id, updateData);
  }

  static async deleteCompetition(id: string) {
    if (!id) throw new Error("ID lomba diperlukan");
    return await CompetitionRepository.delete(id);
  }
}
