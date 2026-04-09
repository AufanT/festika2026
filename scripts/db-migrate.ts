import { config } from "dotenv";
config();
import pool from "./src/lib/mysql";

async function run() {
  try {
    console.log("Creating competitions table...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS competitions (
        id VARCHAR(191) PRIMARY KEY,
        title VARCHAR(191) NOT NULL,
        description TEXT,
        createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
      )
    `);
    
    console.log("Checking if competitionId exists in registrants...");
    const [columns]: any = await pool.query(`SHOW COLUMNS FROM registrants LIKE 'competitionId'`);
    if (columns.length === 0) {
      console.log("Adding competitionId to registrants...");
      await pool.query(`
        ALTER TABLE registrants 
        ADD COLUMN competitionId VARCHAR(191) NOT NULL
      `);
      
      console.log("Adding foreign key constraint...");
      await pool.query(`
        ALTER TABLE registrants 
        ADD CONSTRAINT registrants_competitionId_fkey 
        FOREIGN KEY (competitionId) REFERENCES competitions(id) ON DELETE RESTRICT ON UPDATE CASCADE
      `);
    } else {
      console.log("competitionId already exists.");
    }
    
    console.log("Seeding initial competition data if empty...");
    const [rows]: any = await pool.query(`SELECT id FROM competitions LIMIT 1`);
    if (rows.length === 0) {
      console.log("Seeding...");
      await pool.query(`
        INSERT INTO competitions (id, title, description) VALUES
        ('cuid-comp-1', 'Web Design', 'Lomba mendesain dan membangun website menarik dan responsif.'),
        ('cuid-comp-2', 'UI/UX Design', 'Lomba mendesain antarmuka dan pengalaman pengguna yang inovatif.'),
        ('cuid-comp-3', 'Competitive Programming', 'Lomba menyelesaikan masalah algoritma secara kompetitif.')
      `);
    }
    
    console.log("Done!");
    process.exit(0);
  } catch (err) {
    console.error("Migration error:", err);
    process.exit(1);
  }
}

run();
