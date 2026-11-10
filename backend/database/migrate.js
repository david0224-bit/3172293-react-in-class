// backend/database/migrate.js
// Ejecuta en orden numérico los scripts SQL de database/migrations.
//
// Uso (desde la carpeta backend):
//   npm run migrate            -> aplica todas las migraciones pendientes
//   npm run migrate -- 0005    -> aplica solo hasta la migración 0005
//
// - Crea la base de datos indicada en DB_NAME si todavía no existe.
// - Guarda las migraciones aplicadas en la tabla schema_migrations,
//   por eso se puede ejecutar varias veces sin repetir scripts.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pkg from "pg";
import dotenv from "dotenv";

const { Client } = pkg;

const currentDir = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(currentDir, "..", ".env"), quiet: true });

const migrationsDir = path.join(currentDir, "migrations");
const limit = process.argv[2] ? Number.parseInt(process.argv[2], 10) : Infinity;

const connection = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const databaseName = process.env.DB_NAME;

async function ensureDatabase() {
  const client = new Client({ ...connection, database: "postgres" });
  await client.connect();

  try {
    const result = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [databaseName],
    );

    if (result.rowCount === 0) {
      // El nombre no admite parámetros, por eso se escapa como identificador.
      await client.query(`CREATE DATABASE ${client.escapeIdentifier(databaseName)}`);
      console.log(`Base de datos "${databaseName}" creada.`);
    }
  } finally {
    await client.end();
  }
}

async function runMigrations() {
  const client = new Client({ ...connection, database: databaseName });
  await client.connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        filename VARCHAR(255) PRIMARY KEY,
        applied_at TIMESTAMP DEFAULT NOW()
      )
    `);

    const applied = await client.query("SELECT filename FROM schema_migrations");
    const appliedFiles = new Set(applied.rows.map((row) => row.filename));

    const files = fs
      .readdirSync(migrationsDir)
      .filter((file) => /^\d{4}_.+\.sql$/.test(file))
      .sort();

    let count = 0;

    for (const file of files) {
      if (Number.parseInt(file.slice(0, 4), 10) > limit) break;
      if (appliedFiles.has(file)) continue;

      const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");

      try {
        await client.query("BEGIN");
        await client.query(sql);
        await client.query(
          "INSERT INTO schema_migrations (filename) VALUES ($1)",
          [file],
        );
        await client.query("COMMIT");
      } catch (error) {
        await client.query("ROLLBACK");
        throw new Error(`Falló la migración ${file}: ${error.message}`);
      }

      console.log(`Aplicada: ${file}`);
      count += 1;
    }

    console.log(
      count === 0
        ? "No hay migraciones pendientes."
        : `Listo: ${count} migración(es) aplicada(s) en "${databaseName}".`,
    );
  } finally {
    await client.end();
  }
}

try {
  if (!databaseName) {
    throw new Error("Falta la variable DB_NAME en backend/.env");
  }

  await ensureDatabase();
  await runMigrations();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
