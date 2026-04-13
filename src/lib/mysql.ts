import * as mysql from "mysql2/promise";

declare global {
  // eslint-disable-next-line no-var
  var _mysqlPool: mysql.Pool | undefined;
}

/**
 * BEST PRACTICE: 
 * Semua konfigurasi diambil dari Environment Variables.
 * File ini tidak boleh tahu IP atau hostname secara spesifik (No Hardcoding).
 */
const DB_URL = process.env.DATABASE_URL!;
const url = new URL(DB_URL.startsWith("mysql://") ? DB_URL : `mysql://${DB_URL}`);

// Singleton pool — mencegah multiple pool di dev hot-reload
const poolConfig: any = {
  host: url.hostname,
  port: parseInt(url.port || "3306"),
  user: decodeURIComponent(url.username),
  password: decodeURIComponent(url.password),
  database: url.pathname.replace(/^\//, ""),
  
  // Memaksa IPv4 via config adalah cara paling aman untuk MySQL 
  // di berbagai lingkungan tanpa harus hardcode IP.
  family: 4, 
  
  waitForConnections: true,
  connectionLimit: 15,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
};

const pool: mysql.Pool = global._mysqlPool ?? mysql.createPool(poolConfig);

if (process.env.NODE_ENV !== "production") {
  global._mysqlPool = pool;
}

export default pool;
