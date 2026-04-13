import * as mysql from "mysql2/promise";

declare global {
  // eslint-disable-next-line no-var
  var _mysqlPool: mysql.Pool | undefined;
}

const DB_URL = process.env.DATABASE_URL!;
const url = new URL(DB_URL.startsWith("mysql://") ? DB_URL : `mysql://${DB_URL}`);

// Mapping hostname ke IP IPv4 secara manual HANYA UNTUK DEVELOPMENT.
// Di server produksi (Hostinger), kita biarkan sistem menggunakan hostname asli
// karena jalur koneksi internal mereka lebih stabil menggunakan hostname tersebut.
const isDev = process.env.NODE_ENV !== "production";
const DB_HOST = (isDev && url.hostname === "srv1319.hstgr.io") 
  ? "153.92.15.11" 
  : url.hostname;

// Singleton pool — mencegah multiple pool di dev hot-reload
const poolConfig: any = {
  host: DB_HOST,
  port: parseInt(url.port || "3306"),
  user: decodeURIComponent(url.username),
  password: decodeURIComponent(url.password),
  database: url.pathname.replace(/^\//, ""),
  // family: 4 memaksa koneksi ke IPv4. 
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
