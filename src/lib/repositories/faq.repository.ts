import pool from "@/lib/mysql";

export interface Faq {
  id: string;
  question: string;
  answer: string;
  orderIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

export class FaqRepository {
  static async findAll(): Promise<Faq[]> {
    const [rows]: any = await pool.query(
      "SELECT id, question, answer, orderIndex, createdAt, updatedAt FROM faqs ORDER BY orderIndex ASC, createdAt ASC",
    );
    return rows as Faq[];
  }

  static async create(data: Faq): Promise<Faq> {
    await pool.query(
      "INSERT INTO faqs (id, question, answer, orderIndex, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)",
      [data.id, data.question, data.answer, data.orderIndex, data.createdAt, data.updatedAt],
    );
    return data;
  }

  static async update(id: string, fields: Partial<Faq>): Promise<boolean> {
    const setClauses: string[] = [];
    const values: any[] = [];

    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) {
        setClauses.push(`${key} = ?`);
        values.push(value);
      }
    }

    if (setClauses.length === 0) return false;

    setClauses.push("updatedAt = ?");
    values.push(new Date());
    values.push(id);

    await pool.query(`UPDATE faqs SET ${setClauses.join(", ")} WHERE id = ?`, values);
    return true;
  }

  static async delete(id: string): Promise<boolean> {
    await pool.query("DELETE FROM faqs WHERE id = ?", [id]);
    return true;
  }
}
