
import mysql from "mysql2/promise";
import dns from "node:dns/promises";

// Lấy hostname từ Environment Variables
let dbHost = process.env.DB_HOST;

// Chỉ ép IPv4 nếu được bật trong .env
if (process.env.DB_FORCE_IPV4 === "true" && dbHost) {
  try {
    const { address } = await dns.lookup(dbHost, {
      family: 4,
    });

    dbHost = address;

    console.log(`[MySQL] Connecting via IPv4: ${dbHost}`);
  } catch (error) {
    console.error("[MySQL] IPv4 resolution failed:", error.message);
    throw error;
  }
}

const db = mysql.createPool({
  host: dbHost,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  connectTimeout: 10000,
});

export default db;
