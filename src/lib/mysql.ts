import mysql from "mysql2/promise";
import dns from "dns";

declare global {
  // eslint-disable-next-line no-var
  var _mysqlPool: mysql.Pool | undefined;
}

// Paksa Node.js DNS resolver menggunakan IPv4 secara global.
// Ini mencegah koneksi MySQL ke Hostinger menggunakan IPv6 (yang tidak diizinkan)
// ketika jaringan lokal memiliki dual-stack IPv4/IPv6.
dns.setDefaultResultOrder("ipv4first");

const DB_URL = process.env.DATABASE_URL!;
const url = new URL(DB_URL.startsWith("mysql://") ? DB_URL : `mysql://${DB_URL}`);

// Singleton pool — mencegah multiple pool di dev hot-reload
const pool: mysql.Pool = global._mysqlPool ?? mysql.createPool({
  host: url.hostname,
  port: parseInt(url.port || "3306"),
  user: decodeURIComponent(url.username),
  password: decodeURIComponent(url.password),
  database: url.pathname.replace(/^\//, ""),
  waitForConnections: true,
  connectionLimit: 15,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
});

if (process.env.NODE_ENV !== "production") {
  global._mysqlPool = pool;
}

export default pool;
