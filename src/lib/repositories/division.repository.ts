import pool from "@/lib/mysql";

export class DivisionRepository {
  static async findAll() {
    const [rows]: any = await pool.query(
      "SELECT id, name, imageUrl, orderIndex, createdAt, updatedAt FROM divisions ORDER BY orderIndex ASC, createdAt ASC"
    );
    return rows;
  }

  static async findById(id: string) {
    const [rows]: any = await pool.query(
      "SELECT id, name, imageUrl, orderIndex, createdAt, updatedAt FROM divisions WHERE id = ? LIMIT 1",
      [id]
    );
    return (rows && rows.length > 0) ? rows[0] : null;
  }

  static async create(data: {
    id: string;
    name: string;
    imageUrl: string | null;
    orderIndex: number;
    createdAt: Date;
    updatedAt: Date;
  }) {
    await pool.query(
      "INSERT INTO divisions (id, name, imageUrl, orderIndex, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)",
      [data.id, data.name, data.imageUrl, data.orderIndex, data.createdAt, data.updatedAt]
    );
    return data;
  }
}
