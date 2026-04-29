import pool from "@/lib/mysql";

export class PastEventRepository {
  static async findAll() {
    let attempts = 0;
    const maxAttempts = 3;
    while (attempts < maxAttempts) {
      try {
        const [rows]: any = await pool.query(
          `SELECT id, title, theme, description, year, eventDate, imageUrl, galleryUrls, participants, winner, runnerUp, thirdPlace, orderIndex, createdAt, updatedAt 
           FROM past_events 
           ORDER BY year DESC, orderIndex ASC`,
        );
        return rows.map((row: any) => ({
          ...row,
          galleryUrls:
            typeof row.galleryUrls === "string"
              ? JSON.parse(row.galleryUrls)
              : row.galleryUrls || [],
        }));
      } catch (err: any) {
        attempts++;
        if (
          (err.code === "ECONNRESET" ||
            err.code === "ETIMEDOUT" ||
            err.fatal) &&
          attempts < maxAttempts
        ) {
          console.warn(
            `Database connection error during findAll. Retrying attempt ${attempts}...`,
          );
          continue;
        }
        throw err;
      }
    }
  }

  static async findByYear(year: number) {
    let attempts = 0;
    const maxAttempts = 3;
    while (attempts < maxAttempts) {
      try {
        const [rows]: any = await pool.query(
          `SELECT id, title, theme, description, year, eventDate, imageUrl, galleryUrls, participants, winner, runnerUp, thirdPlace, orderIndex, createdAt, updatedAt 
           FROM past_events 
           WHERE year = ?
           ORDER BY orderIndex ASC`,
          [year],
        );
        return rows.map((row: any) => ({
          ...row,
          galleryUrls:
            typeof row.galleryUrls === "string"
              ? JSON.parse(row.galleryUrls)
              : row.galleryUrls || [],
        }));
      } catch (err: any) {
        attempts++;
        if (
          (err.code === "ECONNRESET" ||
            err.code === "ETIMEDOUT" ||
            err.fatal) &&
          attempts < maxAttempts
        ) {
          console.warn(
            `Database connection error during findByYear. Retrying attempt ${attempts}...`,
          );
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
          "SELECT id, title, theme, description, year, eventDate, imageUrl, galleryUrls, participants, winner, runnerUp, thirdPlace, orderIndex, createdAt, updatedAt FROM past_events WHERE id = ? LIMIT 1",
          [id],
        );
        if (rows && rows.length > 0) {
          const row = rows[0];
          return {
            ...row,
            galleryUrls:
              typeof row.galleryUrls === "string"
                ? JSON.parse(row.galleryUrls)
                : row.galleryUrls || [],
          };
        }
        return null;
      } catch (err: any) {
        attempts++;
        if (
          (err.code === "ECONNRESET" ||
            err.code === "ETIMEDOUT" ||
            err.fatal) &&
          attempts < maxAttempts
        ) {
          console.warn(
            `Database connection error during findById. Retrying attempt ${attempts}...`,
          );
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
    year: number;
    eventDate?: Date | null;
    imageUrl?: string | null;
    galleryUrls?: any;
    participants?: number | null;
    winner?: string | null;
    runnerUp?: string | null;
    thirdPlace?: string | null;
    orderIndex?: number;
    createdAt: Date;
    updatedAt: Date;
  }) {
    let attempts = 0;
    const maxAttempts = 3;
    while (attempts < maxAttempts) {
      try {
        await pool.query(
          "INSERT INTO past_events (id, title, theme, description, year, eventDate, imageUrl, galleryUrls, participants, winner, runnerUp, thirdPlace, orderIndex, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            data.id,
            data.title,
            data.theme,
            data.description,
            data.year,
            data.eventDate,
            data.imageUrl,
            data.galleryUrls ? JSON.stringify(data.galleryUrls) : null,
            data.participants,
            data.winner,
            data.runnerUp,
            data.thirdPlace,
            data.orderIndex || 0,
            data.createdAt,
            data.updatedAt,
          ],
        );
        return data;
      } catch (err: any) {
        attempts++;
        if (
          (err.code === "ECONNRESET" ||
            err.code === "ETIMEDOUT" ||
            err.fatal) &&
          attempts < maxAttempts
        ) {
          console.warn(
            `Database connection error during create. Retrying attempt ${attempts}...`,
          );
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
          if (key === "id") continue;
          fields.push(`${key} = ?`);
          if (key === "galleryUrls") {
            values.push(value ? JSON.stringify(value) : null);
          } else if (key === "eventDate") {
            values.push(value ? new Date(value as string) : null);
          } else {
            values.push(value);
          }
        }

        fields.push("updatedAt = ?");
        values.push(new Date());
        values.push(id);

        await pool.query(
          `UPDATE past_events SET ${fields.join(", ")} WHERE id = ?`,
          values,
        );
        return true;
      } catch (err: any) {
        attempts++;
        if (
          (err.code === "ECONNRESET" ||
            err.code === "ETIMEDOUT" ||
            err.fatal) &&
          attempts < maxAttempts
        ) {
          console.warn(
            `Database connection error during update. Retrying attempt ${attempts}...`,
          );
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
        await pool.query("DELETE FROM past_events WHERE id = ?", [id]);
        return true;
      } catch (err: any) {
        attempts++;
        if (
          (err.code === "ECONNRESET" ||
            err.code === "ETIMEDOUT" ||
            err.fatal) &&
          attempts < maxAttempts
        ) {
          console.warn(
            `Database connection error during delete. Retrying attempt ${attempts}...`,
          );
          continue;
        }
        throw err;
      }
    }
    return true;
  }
}
