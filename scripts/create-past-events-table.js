const fs = require("fs");
const mysql = require("mysql2/promise");

async function run() {
  const envFile = fs.readFileSync(".env", "utf-8");
  const urlMatch =
    envFile.match(/DATABASE_URL="([^"]+)"/) ||
    envFile.match(/DATABASE_URL=([^\s]+)/);
  const dbUrl = urlMatch[1];

  const pool = mysql.createPool(dbUrl);

  try {
    console.log("Creating past_events table...");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS past_events (
        id VARCHAR(191) PRIMARY KEY,
        title VARCHAR(191) NOT NULL,
        theme VARCHAR(191) NULL,
        description TEXT NULL,
        year INT NOT NULL DEFAULT 2025,
        eventDate DATETIME(3) NULL,
        imageUrl TEXT NULL,
        galleryUrls JSON NULL,
        participants INT NULL,
        winner VARCHAR(191) NULL,
        runnerUp VARCHAR(191) NULL,
        thirdPlace VARCHAR(191) NULL,
        orderIndex INT NOT NULL DEFAULT 0,
        createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
        INDEX \`pastEvent_year_idx\` (\`year\`),
        INDEX \`pastEvent_orderIndex_idx\` (\`orderIndex\`)
      )
    `);

    console.log("✅ Past events table created successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Migration error:", err);
    process.exit(1);
  }
}

run();
