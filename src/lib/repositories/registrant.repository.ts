import pool from "@/lib/mysql";

export class RegistrantRepository {
  static async findAll(competitionId?: string, limit: number = 50, offset: number = 0, search: string = "") {
    let query = "SELECT id, name, email, phone, major, year, createdAt, competitionId FROM registrants";
    const params: any[] = [];
    const conditions: string[] = [];

    if (competitionId) {
      conditions.push("competitionId = ?");
      params.push(competitionId);
    }

    if (search) {
      conditions.push("(name LIKE ? OR email LIKE ? OR major LIKE ?)");
      const searchVal = `%${search}%`;
      params.push(searchVal, searchVal, searchVal);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY createdAt DESC LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const [rows]: any = await pool.query(query, params);
    return rows;
  }

  static async findAllForExport(competitionId: string) {
    const [rows]: any = await pool.query(
      "SELECT id, name, email, phone, major, year, createdAt, competitionId FROM registrants WHERE competitionId = ? ORDER BY createdAt DESC",
      [competitionId]
    );
    return rows;
  }

  static async countByCompetitionId(competitionId: string, search: string = "") {
    let query = "SELECT COUNT(*) as total FROM registrants WHERE competitionId = ?";
    const params: any[] = [competitionId];

    if (search) {
      query += " AND (name LIKE ? OR email LIKE ? OR major LIKE ?)";
      const searchVal = `%${search}%`;
      params.push(searchVal, searchVal, searchVal);
    }

    const [rows]: any = await pool.query(query, params);
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
