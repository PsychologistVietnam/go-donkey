import { createInterface } from "node:readline/promises";
import { Writable } from "node:stream";
import argon2 from "argon2";
import db from "../config.js";

async function main() {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    throw new Error("Run this script directly in an interactive terminal.");
  }

  const [username, fullName, email] = process.argv.slice(2);
  if (
    !username || username.length > 50 || username.trim() !== username ||
    !fullName?.trim() || fullName.length > 160 ||
    !email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    throw new Error('Usage: node --env-file=.env server/scripts/createAdmin.js USERNAME "FULL NAME" EMAIL');
  }

  console.log("Target database:", process.env.DB_NAME);
  console.log("New admin:", username, fullName, email);

  let hidden = false;
  const output = new Writable({
    write(chunk, encoding, callback) {
      if (!hidden) process.stdout.write(chunk, encoding);
      callback();
    },
  });
  const prompt = createInterface({ input: process.stdin, output, terminal: true });
  prompt.on("SIGINT", () => prompt.close());

  async function readPassword(label) {
    process.stdout.write(label);
    hidden = true;
    try {
      return await prompt.question("");
    } finally {
      hidden = false;
      process.stdout.write("\n");
    }
  }

  let passwordHash;
  try {
    const confirmation = await prompt.question("Type CREATE to write this admin to this database: ");
    if (confirmation !== "CREATE") throw new Error("Cancelled; no account created.");

    let password = await readPassword("Password (hidden, 8-128 characters): ");
    let repeated = await readPassword("Confirm password (hidden): ");
    if (password.length < 8 || password.length > 128 || !password.trim()) {
      throw new Error("Password must contain 8-128 characters and cannot be blank.");
    }
    if (password !== repeated) throw new Error("Passwords do not match.");
    passwordHash = await argon2.hash(password, { type: argon2.argon2id });
    password = "";
    repeated = "";
  } finally {
    prompt.close();
  }

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const [roles] = await connection.execute("SELECT id FROM roles WHERE code = ?", ["admin"]);
    if (roles.length !== 1) throw new Error("Expected exactly one existing admin role.");

    const [existing] = await connection.execute(
      "SELECT id FROM users WHERE username = ? OR email = ? LIMIT 1",
      [username, email],
    );
    if (existing.length) throw new Error("Username or email already exists; nothing overwritten.");

    await connection.execute(
      "INSERT INTO users (username, full_name, email, password_hash, is_active) VALUES (?, ?, ?, ?, ?)",
      [username, fullName, email, passwordHash, 1],
    );
    const [created] = await connection.execute(
      "SELECT CAST(id AS CHAR) AS id FROM users WHERE username = ?", [username],
    );
    await connection.execute(
      "INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)",
      [created[0].id, roles[0].id],
    );
    await connection.commit();
    console.log("Admin created successfully:", username);
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

try {
  await main();
} catch (error) {
  // SQL errors may contain statement values; never print them or their SQL.
  console.error("Admin creation failed:", error.sql ? error.code : error.message);
  process.exitCode = 1;
} finally {
  await db.end();
}
