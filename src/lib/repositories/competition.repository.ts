import pool from "@/lib/mysql";

export class CompetitionRepository {
  static async findAll() {
    let attempts = 0;
    const maxAttempts = 3;
    while (attempts < maxAttempts) {
      try {
        const [rows]: any = await pool.query(
          `SELECT id, title, theme, description, registrationStartDate, registrationEndDate, registrationLink, contacts, tags, imageUrl, createdAt, updatedAt 
           FROM competitions 
           ORDER BY createdAt ASC`
        );
        return rows.map((row: any) => ({
          ...row,
          contacts: typeof row.contacts === 'string' ? JSON.parse(row.contacts) : (row.contacts || [])
        }));
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
          "SELECT id, title, theme, description, registrationStartDate, registrationEndDate, registrationLink, contacts, tags, imageUrl, createdAt, updatedAt FROM competitions WHERE id = ? LIMIT 1",
          [id]
        );
        if (rows && rows.length > 0) {
          const row = rows[0];
          return {
            ...row,
            contacts: typeof row.contacts === 'string' ? JSON.parse(row.contacts) : (row.contacts || [])
          };
        }
        return null;
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
    theme?: string | null;
    description?: string | null;
    registrationStartDate?: Date | null;
    registrationEndDate?: Date | null;
    registrationLink: string;
    contacts?: any;
    tags?: string | null;
    imageUrl?: string | null;
    createdAt: Date;
    updatedAt: Date;
  }) {
    let attempts = 0;
    const maxAttempts = 3;
    while (attempts < maxAttempts) {
      try {
        await pool.query(
          "INSERT INTO competitions (id, title, theme, description, registrationStartDate, registrationEndDate, registrationLink, contacts, tags, imageUrl, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            data.id, 
            data.title, 
            data.theme, 
            data.description, 
            data.registrationStartDate, 
            data.registrationEndDate, 
            data.registrationLink, 
            data.contacts ? JSON.stringify(data.contacts) : null, 
            data.tags, 
            data.imageUrl, 
            data.createdAt, 
            data.updatedAt
          ]
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

  static async update(id: string, data: any) {
    let attempts = 0;
    const maxAttempts = 3;
    while (attempts < maxAttempts) {
      try {
        const fields = [];
        const values = [];
        
        for (const [key, value] of Object.entries(data)) {
          if (key === 'id') continue;
          fields.push(`${key} = ?`);
          if (key === 'contacts') {
            values.push(value ? JSON.stringify(value) : null);
          } else if (key === 'registrationStartDate' || key === 'registrationEndDate') {
            values.push(value ? new Date(value as string) : null);
          } else {
            values.push(value);
          }
        }
        
        fields.push("updatedAt = ?");
        values.push(new Date());
        values.push(id);

        await pool.query(
          `UPDATE competitions SET ${fields.join(", ")} WHERE id = ?`,
          values
        );
        return true;
      } catch (err: any) {
        attempts++;
        if ((err.code === "ECONNRESET" || err.code === "ETIMEDOUT" || err.fatal) && attempts < maxAttempts) {
          console.warn(`Database connection error during update. Retrying attempt ${attempts}...`);
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
