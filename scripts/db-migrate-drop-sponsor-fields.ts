import { config } from "dotenv";
config();
import pool from "../src/lib/mysql";

async function run() {
  try {
    console.log("Checking columns on sponsors table...");

    const [columns]: any = await pool.query(`SHOW COLUMNS FROM sponsors LIKE 'tier'`);
    if (columns.length > 0) {
      console.log("Dropping column 'tier' from sponsors...");
      await pool.query("ALTER TABLE sponsors DROP COLUMN tier");
      console.log("Column 'tier' dropped.");
    } else {
      console.log("Column 'tier' already removed.");
    }

    const [linkCol]: any = await pool.query(`SHOW COLUMNS FROM sponsors LIKE 'link'`);
    if (linkCol.length > 0) {
      console.log("Dropping column 'link' from sponsors...");
      await pool.query("ALTER TABLE sponsors DROP COLUMN link");
      console.log("Column 'link' dropped.");
    } else {
      console.log("Column 'link' already removed.");
    }

    console.log("Migration complete.");
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

run();
