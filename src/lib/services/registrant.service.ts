import { RegistrantRepository } from "@/lib/repositories/registrant.repository";
import crypto from "crypto";

export class RegistrantService {
  static async getAllRegistrants(competitionId?: string) {
    return await RegistrantRepository.findAll(competitionId);
  }

  static async registerParticipant(data: {
    name: string;
    email: string;
    phone: string;
    major: string;
    year: number;
    competitionId: string;
  }) {
    // 1. Business Logic: Check if email already registered
    const existing = await RegistrantRepository.findByEmail(data.email);
    if (existing) {
      throw new Error("Email ini sudah terdaftar. Silakan gunakan email lain.");
    }

    // 2. Data Preparation
    const registrantData = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };

    // 3. Database Call
    return await RegistrantRepository.create(registrantData);
  }
}
