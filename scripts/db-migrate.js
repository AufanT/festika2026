const fs = require("fs");
const mysql = require("mysql2/promise");

async function run() {
  const envFile = fs.readFileSync(".env", "utf-8");
  const urlMatch = envFile.match(/DATABASE_URL="([^"]+)"/) || envFile.match(/DATABASE_URL=([^\s]+)/);
  const dbUrl = urlMatch[1];
  
  const pool = mysql.createPool(dbUrl);

  try {
    console.log("Creating divisions table...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS divisions (
        id VARCHAR(191) PRIMARY KEY,
        name VARCHAR(191) NOT NULL,
        imageUrl TEXT,
        orderIndex INT NOT NULL DEFAULT 0,
        createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
      )
    `);

    console.log("Creating staff table...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS staff (
        id VARCHAR(191) PRIMARY KEY,
        name VARCHAR(191) NOT NULL,
        role VARCHAR(191) NOT NULL,
        description TEXT,
        imageUrl TEXT,
        divisionId VARCHAR(191) NULL,
        orderIndex INT NOT NULL DEFAULT 0,
        createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
        CONSTRAINT staff_divisionId_fkey FOREIGN KEY (divisionId) REFERENCES divisions(id) ON DELETE CASCADE ON UPDATE CASCADE
      )
    `);

    console.log("Done!");
    process.exit(0);
  } catch (err) {
    console.error("Migration error:", err);
    process.exit(1);
  }
}

run();
