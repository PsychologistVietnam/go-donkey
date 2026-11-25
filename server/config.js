
import mysql from "mysql2/promise";
import net from "node:net";

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  // Create each connection over IPv4 when requested, without top-level await.
  stream: process.env.DB_FORCE_IPV4 === "true"
    ? (options) => net.createConnection({
        host: options.config.host,
        port: options.config.port,
        family: 4,
        autoSelectFamily: false,
      })
    : undefined,

  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  connectTimeout: 10000,
});

export default db;
