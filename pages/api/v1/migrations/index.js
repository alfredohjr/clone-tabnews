import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

import database from "infra/database";

async function migrations(req, res) {

  const AllowedMethods = ["GET", "POST"];
  if (!AllowedMethods.includes(req.method)) {
    return res.status(405).end();
  }

  if (req.method === "GET") {
    const dbClient = await database.getNewClient();

    const migrations = await migrationRunner({
      dbClient: dbClient,
      dryRun: true,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    });

    await dbClient.end();

    res.status(200).json(migrations);
  } else if (req.method === "POST") {
    const dbClient = await database.getNewClient();

    const migrations = await migrationRunner({
      dbClient: dbClient,
      dryRun: false,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    });

    await dbClient.end();

    if (migrations.length > 0) {
      return res.status(201).json(migrations);
    }

    res.status(200).json(migrations);
  }

  return res.status(405).end();
}

export default migrations;
