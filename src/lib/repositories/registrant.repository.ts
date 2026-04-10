import pool from "@/lib/mysql";

export class RegistrantRepository {
  static async findAll(competitionId?: string, limit: number = 50, offset: number = 0) {
    console.log(`[RegistrantRepository] Mencari pendaftar: competitionId=${competitionId || 'ALL'}, limit=${limit}, offset=${offset}`);
    if (competitionId) {
      const [rows]: any = await pool.query(
        "SELECT id, name, email, phone, major, year, createdAt, competitionId FROM registrants WHERE competitionId = ? ORDER BY createdAt DESC LIMIT ? OFFSET ?",
        [competitionId, limit, offset]
      );
      return rows;
    }

    const [rows]: any = await pool.query(
      "SELECT id, name, email, phone, major, year, createdAt, competitionId FROM registrants ORDER BY createdAt DESC LIMIT ? OFFSET ?",
      [limit, offset]
    );
    return rows;
  }

  static async countByCompetitionId(competitionId: string) {
    const [rows]: any = await pool.query(
      "SELECT COUNT(*) as total FROM registrants WHERE competitionId = ?",
      [competitionId]
    );
    return rows[0].total;
  }

  static async findByEmail(email: string) {
    const [rows]: any = await pool.query(
      "SELECT id FROM registrants WHERE email = ? LIMIT 1",
      [email]
    );
    return (rows && rows.length > 0) ? rows[0] : null;
  }

  static async create(data: {
    id: string;
    name: string;
    email: string;
    phone: string;
    major: string;
    year: number;
    competitionId: string;
    createdAt: Date;
  }) {
    console.log(`[RegistrantRepository] Mencoba mendaftarkan: ${data.name} (${data.email}) ke kompetisi: ${data.competitionId}`);
    try {
      await pool.query(
        "INSERT INTO registrants (id, name, email, phone, major, year, competitionId, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [data.id, data.name, data.email, data.phone, data.major, data.year, data.competitionId, data.createdAt]
      );
      console.log(`[RegistrantRepository] Berhasil mendaftarkan: ${data.id}`);
      return data;
    } catch (error) {
      console.error(`[RegistrantRepository] Gagal mendaftarkan:`, error);
      throw error;
    }
  }
}
