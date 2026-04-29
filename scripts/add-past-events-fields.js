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
    console.log("Adding past events fields to competitions table...");

    // Add fields if they don't exist
    await pool.query(`
      ALTER TABLE competitions
      ADD COLUMN IF NOT EXISTS \`year\` INT NOT NULL DEFAULT 2026,
      ADD COLUMN IF NOT EXISTS \`isArchived\` BOOLEAN NOT NULL DEFAULT false,
      ADD COLUMN IF NOT EXISTS \`participants\` INT NULL,
      ADD COLUMN IF NOT EXISTS \`winner\` VARCHAR(191) NULL,
      ADD COLUMN IF NOT EXISTS \`runnerUp\` VARCHAR(191) NULL,
      ADD COLUMN IF NOT EXISTS \`thirdPlace\` VARCHAR(191) NULL,
      ADD COLUMN IF NOT EXISTS \`galleryUrls\` JSON NULL
    `);

    // Add indexes
    await pool.query(`
      CREATE INDEX IF NOT EXISTS \`competition_year_idx\` ON competitions(\`year\`)
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS \`competition_isArchived_idx\` ON competitions(\`isArchived\`)
    `);

    console.log("✅ Migration completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Migration error:", err);
    process.exit(1);
  }
}

run();
