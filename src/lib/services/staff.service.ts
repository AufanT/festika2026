import { StaffRepository } from "@/lib/repositories/staff.repository";
import crypto from "crypto";

export class StaffService {
  static async getStaffByDivision(divisionId: string) {
    if (!divisionId) throw new Error("Division ID required");
    return await StaffRepository.findByDivisionId(divisionId);
  }

  static async getCoreLeaders() {
    return await StaffRepository.findCoreLeaders();
  }

  static async createStaff(data: {
    name: string;
    role: string;
    description?: string | null;
    imageUrl?: string | null;
    divisionId?: string | null;
    orderIndex?: number;
  }) {
    if (!data.name || data.name.trim() === "") {
      throw new Error("Nama wajib diisi");
    }
    if (!data.role || data.role.trim() === "") {
      throw new Error("Peran (Role) wajib diisi");
    }

    const roleUpper = data.role.trim().toUpperCase();

    // Validasi Koordinator (Max 1 per divisi)
    if (roleUpper === "KOORDINATOR" && data.divisionId) {
      const existingKoorCount = await StaffRepository.countCoordinators(data.divisionId);
      if (existingKoorCount >= 1) {
        throw new Error("Divisi ini sudah memiliki seorang Koordinator.");
      }
    }

    const newStaff = {
      id: "stf-" + crypto.randomBytes(8).toString("hex"),
      name: data.name.trim(),
      role: roleUpper,
      description: data.description || null,
      imageUrl: data.imageUrl || null,
      divisionId: data.divisionId || null,
      orderIndex: data.orderIndex || 0,
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
