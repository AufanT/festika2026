import pool from "@/lib/mysql";

export class RegistrantRepository {
  static async findAll(competitionId?: string) {
    if (competitionId) {
      const [rows]: any = await pool.query(
        "SELECT id, name, email, phone, major, year, createdAt, competitionId FROM registrants WHERE competitionId = ? ORDER BY createdAt DESC",
        [competitionId]
      );
      return rows;
    }

    const [rows]: any = await pool.query(
      "SELECT id, name, email, phone, major, year, createdAt, competitionId FROM registrants ORDER BY createdAt DESC"
    );
    return rows;
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
    await pool.query(
      "INSERT INTO registrants (id, name, email, phone, major, year, competitionId, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [data.id, data.name, data.email, data.phone, data.major, data.year, data.competitionId, data.createdAt]
    );
    return data;
  }
}
