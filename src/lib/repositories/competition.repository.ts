import pool from "@/lib/mysql";

export class CompetitionRepository {
  static async findAll() {
    let attempts = 0;
    const maxAttempts = 3;
    while (attempts < maxAttempts) {
      try {
        const [rows]: any = await pool.query(
          "SELECT id, title, description, createdAt, updatedAt FROM competitions ORDER BY createdAt ASC"
        );
        return rows;
      } catch (err: any) {
        attempts++;
        if ((err.code === "ECONNRESET" || err.code === "ETIMEDOUT" || err.fatal) && attempts < maxAttempts) {
          console.warn(`Database connection error during findAll. Retrying attempt ${attempts}...`);
          continue;
        }
        throw err;
      }
    }
  }

  static async findById(id: string) {
    let attempts = 0;
    const maxAttempts = 3;
    while (attempts < maxAttempts) {
      try {
        const [rows]: any = await pool.query(
          "SELECT id, title, description, createdAt, updatedAt FROM competitions WHERE id = ? LIMIT 1",
          [id]
        );
        return (rows && rows.length > 0) ? rows[0] : null;
      } catch (err: any) {
        attempts++;
        if ((err.code === "ECONNRESET" || err.code === "ETIMEDOUT" || err.fatal) && attempts < maxAttempts) {
          console.warn(`Database connection error during findById. Retrying attempt ${attempts}...`);
          continue;
        }
        throw err;
      }
    }
  }

  static async create(data: {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    let attempts = 0;
    const maxAttempts = 3;
    while (attempts < maxAttempts) {
      try {
        await pool.query(
          "INSERT INTO competitions (id, title, description, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)",
          [data.id, data.title, data.description, data.createdAt, data.updatedAt]
        );
        return data;
      } catch (err: any) {
        attempts++;
        if ((err.code === "ECONNRESET" || err.code === "ETIMEDOUT" || err.fatal) && attempts < maxAttempts) {
          console.warn(`Database connection error during create. Retrying attempt ${attempts}...`);
          continue;
        }
        throw err;
      }
    }
  }

  static async delete(id: string) {
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      try {
        await pool.query("DELETE FROM competitions WHERE id = ?", [id]);
        return true;
      } catch (err: any) {
        attempts++;
        if ((err.code === "ECONNRESET" || err.code === "ETIMEDOUT" || err.fatal) && attempts < maxAttempts) {
          console.warn(`Database connection error during delete. Retrying attempt ${attempts}...`);
          continue;
        }
        throw err;
      }
    }
    return true;
  }
}
