import { FaqRepository, Faq } from "@/lib/repositories/faq.repository";
import { faqSchema } from "@/lib/validations";
import crypto from "crypto";

export class FaqService {
  static async getAllFaqs(): Promise<Faq[]> {
    return await FaqRepository.findAll();
  }

  static async createFaq(data: any): Promise<Faq> {
    const validated = faqSchema.parse(data);
    const now = new Date();

    const newFaq: Faq = {
      id: crypto.randomUUID(),
      question: validated.question,
      answer: validated.answer,
      orderIndex: validated.orderIndex ?? 0,
      createdAt: now,
      updatedAt: now,
    };

    return await FaqRepository.create(newFaq);
  }

  static async updateFaq(id: string, data: any): Promise<boolean> {
    const validated = faqSchema.partial().parse(data);

    const fields: Partial<Faq> = {};
    if (validated.question !== undefined) fields.question = validated.question;
    if (validated.answer !== undefined) fields.answer = validated.answer;
    if (validated.orderIndex !== undefined) fields.orderIndex = validated.orderIndex;

    if (Object.keys(fields).length === 0) {
      throw new Error("No fields to update");
    }

    return await FaqRepository.update(id, fields);
  }

  static async deleteFaq(id: string): Promise<boolean> {
    if (!id) throw new Error("ID FAQ diperlukan");
    return await FaqRepository.delete(id);
  }
}
