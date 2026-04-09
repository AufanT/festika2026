import { StaffRepository } from "@/lib/repositories/staff.repository";
import { staffSchema } from "@/lib/validations";
import crypto from "crypto";

export class StaffService {
  static async getStaffByDivision(divisionId: string) {
    if (!divisionId) throw new Error("Division ID required");
    return await StaffRepository.findByDivisionId(divisionId);
  }

  static async getCoreLeaders() {
    return await StaffRepository.findCoreLeaders();
  }

  static async createStaff(data: any) {
    const validated = staffSchema.parse(data);

    // Validasi Koordinator (Max 1 per divisi)
    if (validated.role === "KOORDINATOR" && validated.divisionId) {
      const existingKoorCount = await StaffRepository.countCoordinators(validated.divisionId);
      if (existingKoorCount >= 1) {
        throw new Error("Divisi ini sudah memiliki seorang Koordinator.");
      }
    }

    const newStaff = {
      id: "stf-" + crypto.randomBytes(8).toString("hex"),
      name: validated.name.trim(),
      role: validated.role,
      description: validated.description || null,
      imageUrl: validated.imageUrl || null,
      divisionId: validated.divisionId || null,
      orderIndex: validated.orderIndex || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return await StaffRepository.create(newStaff);
  }

  static async deleteStaff(id: string) {
    if (!id) throw new Error("ID anggota diperlukan");
    return await StaffRepository.delete(id);
  }
}
