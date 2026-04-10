import migrationsRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";

export default async function migrations(request, response) {
  const dbConnection = await database.databaseConnection();

  const migrationRunnerConfig = {
    dbClient: dbConnection,
    dir: join("infra", "migrations"),
    direction: "up",
    dryRun: false,
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  if (request.method === "POST") {
    const migratedMigrations = await migrationsRunner({
      ...migrationRunnerConfig,
    });

    dbConnection.end();

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }

    return response.status(200).json(migratedMigrations);
  }

  if (request.method === "GET") {
    const pendingMigrations = await migrationsRunner({
      ...migrationRunnerConfig,
      dryRun: true,
    });

    dbConnection.end();

    return response.status(200).json(pendingMigrations);
  }

  dbConnection.end();

  return response.status(405).end();
}
