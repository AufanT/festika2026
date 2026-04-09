import mysql from "mysql2/promise";

declare global {
  // eslint-disable-next-line no-var
  var _mysqlPool: mysql.Pool | undefined;
}

const DB_URL = process.env.DATABASE_URL!;

// Singleton pool — prevents multiple pools from being created in dev hot-reload
const pool: mysql.Pool = global._mysqlPool ?? mysql.createPool({
  uri: DB_URL,
  waitForConnections: true,
  connectionLimit: 15, // Ditingkatkan
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000, // 10 detik
});

if (process.env.NODE_ENV !== "production") {
  global._mysqlPool = pool;
}

export default pool;
