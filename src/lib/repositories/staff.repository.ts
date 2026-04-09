import pool from "@/lib/mysql";

export class StaffRepository {
  static async findByDivisionId(divisionId: string) {
    const [rows]: any = await pool.query(
      `SELECT id, name, role, description, imageUrl, divisionId, orderIndex, createdAt, updatedAt 
       FROM staff 
       WHERE divisionId = ? 
       ORDER BY CASE WHEN role = 'KOORDINATOR' THEN 0 ELSE 1 END, orderIndex ASC, createdAt ASC`,
      [divisionId]
    );
    return rows;
  }

  static async findCoreLeaders() {
    const [rows]: any = await pool.query(
      `SELECT id, name, role, description, imageUrl, divisionId, orderIndex, createdAt, updatedAt 
       FROM staff 
       WHERE divisionId IS NULL 
       ORDER BY orderIndex ASC, createdAt ASC`
    );
    return rows;
  }

  static async countCoordinators(divisionId: string) {
    const [rows]: any = await pool.query(
      "SELECT COUNT(*) as count FROM staff WHERE divisionId = ? AND role = 'KOORDINATOR'",
      [divisionId]
    );
    return rows[0].count;
  }

  static async create(data: {
    id: string;
    name: string;
    role: string;
    description: string | null;
    imageUrl: string | null;
    divisionId: string | null;
    orderIndex: number;
    createdAt: Date;
    updatedAt: Date;
  }) {
    let attempts = 0;
    const maxAttempts = 3;
    
    while (attempts < maxAttempts) {
      try {
        await pool.query(
          "INSERT INTO staff (id, name, role, description, imageUrl, divisionId, orderIndex, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [data.id, data.name, data.role, data.description, data.imageUrl, data.divisionId, data.orderIndex, data.createdAt, data.updatedAt]
        );
        return data;
      } catch (err: any) {
        attempts++;
        if ((err.code === "ECONNRESET" || err.fatal) && attempts < maxAttempts) {
          console.warn(`Database connection reset. Retrying attempt ${attempts}...`);
          continue;
        }
        throw err;
      }
    }
    return data;
  }
  static async delete(id: string) {
    await pool.query("DELETE FROM staff WHERE id = ?", [id]);
    return true;
  }
}
