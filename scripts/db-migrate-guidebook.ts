import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "../.env") });

async function run() {
  const mysql = await import("mysql2/promise");
  const DB_URL = process.env.DATABASE_URL!;
  const url = new URL(DB_URL.startsWith("mysql://") ? DB_URL : `mysql://${DB_URL}`);
  const pool = mysql.default.createPool({
    host: url.hostname,
    port: parseInt(url.port || "3306"),
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.replace(/^\//, ""),
    connectionLimit: 5,
  });

  try {
    console.log("Adding guidebook column to competitions...");
    await pool.query(`
      ALTER TABLE competitions
      ADD COLUMN guidebook VARCHAR(500) DEFAULT NULL
    `);
    console.log("Done! guidebook column added.");
    process.exit(0);
  } catch (err) {
    console.error("Migration error:", err);
    process.exit(1);
  }
}

run();
