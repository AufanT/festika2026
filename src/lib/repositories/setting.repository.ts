import pool from "@/lib/mysql";

export class SettingRepository {
  static async findAll() {
    let attempts = 0;
    const maxAttempts = 3;
    while (attempts < maxAttempts) {
      try {
        const [rows]: any = await pool.query("SELECT `key`, `value` FROM site_settings");
        return rows.reduce((acc: any, row: any) => {
          acc[row.key] = row.value;
          return acc;
        }, {});
      } catch (err: any) {
        attempts++;
        if ((err.code === "ECONNRESET" || err.code === "ETIMEDOUT" || err.fatal) && attempts < maxAttempts) {
          console.warn(`Database connection error during settings findAll. Retrying attempt ${attempts}...`);
          continue;
        }
        throw err;
      }
    }
  }

  static async upsert(key: string, value: string) {
    let attempts = 0;
    const maxAttempts = 3;
    while (attempts < maxAttempts) {
      try {
        await pool.query(
          "INSERT INTO site_settings (`key`, `value`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `value` = ?",
          [key, value, value]
        );
        return true;
      } catch (err: any) {
        attempts++;
        if ((err.code === "ECONNRESET" || err.code === "ETIMEDOUT" || err.fatal) && attempts < maxAttempts) {
          console.warn(`Database connection error during settings upsert. Retrying attempt ${attempts}...`);
          continue;
        }
        throw err;
      }
    }
  }
}
