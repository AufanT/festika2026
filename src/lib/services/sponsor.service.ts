import { SponsorRepository, Sponsor } from "@/lib/repositories/sponsor.repository";
import { sponsorSchema } from "@/lib/validations";
import crypto from "crypto";

export class SponsorService {
  static async getAllSponsors(): Promise<Sponsor[]> {
    return await SponsorRepository.findAll();
  }

  static async createSponsor(data: any): Promise<Sponsor> {
    const validated = sponsorSchema.parse(data);

    const newSponsor: Sponsor = {
      id: "spn-" + crypto.randomBytes(8).toString("hex"),
      name: validated.name.trim(),
      imageUrl: validated.imageUrl || null,
      link: validated.link || null,
      tier: validated.tier || "General",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return await SponsorRepository.create(newSponsor);
  }

  static async deleteSponsor(id: string): Promise<boolean> {
    if (!id) throw new Error("ID sponsor diperlukan");
    return await SponsorRepository.delete(id);
  }
}
