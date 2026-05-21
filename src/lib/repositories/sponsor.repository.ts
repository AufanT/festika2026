import pool from "@/lib/mysql";

export interface Sponsor {
  id: string;
  name: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class SponsorRepository {
  static async findAll(): Promise<Sponsor[]> {
    let attempts = 0;
    const maxAttempts = 3;
    while (attempts < maxAttempts) {
      try {
        const [rows]: any = await pool.query(
          "SELECT id, name, imageUrl, createdAt, updatedAt FROM sponsors ORDER BY name ASC"
        );
        return rows as Sponsor[];
      } catch (err: any) {
        attempts++;
        if ((err.code === "ECONNRESET" || err.code === "ETIMEDOUT" || err.fatal) && attempts < maxAttempts) {
          console.warn(`Database connection error during sponsors findAll. Retrying attempt ${attempts}...`);
          continue;
        }
        throw err;
      }
    }
    return [];
  }

  static async create(data: Sponsor): Promise<Sponsor> {
    let attempts = 0;
    const maxAttempts = 3;
    while (attempts < maxAttempts) {
      try {
        await pool.query(
          "INSERT INTO sponsors (id, name, imageUrl, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)",
          [data.id, data.name, data.imageUrl, data.createdAt, data.updatedAt]
        );
        return data;
      } catch (err: any) {
        attempts++;
        if ((err.code === "ECONNRESET" || err.code === "ETIMEDOUT" || err.fatal) && attempts < maxAttempts) {
          console.warn(`Database connection error during sponsors create. Retrying attempt ${attempts}...`);
          continue;
        }
        throw err;
      }
    }
    throw new Error("Failed to create sponsor after max attempts");
  }

  static async delete(id: string): Promise<boolean> {
    let attempts = 0;
    const maxAttempts = 3;
    while (attempts < maxAttempts) {
      try {
        await pool.query("DELETE FROM sponsors WHERE id = ?", [id]);
        return true;
      } catch (err: any) {
        attempts++;
        if ((err.code === "ECONNRESET" || err.code === "ETIMEDOUT" || err.fatal) && attempts < maxAttempts) {
          console.warn(`Database connection error during sponsors delete. Retrying attempt ${attempts}...`);
          continue;
        }
        throw err;
      }
    }
    return false;
  }
}
