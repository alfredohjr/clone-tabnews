import database from "infra/database.js";
import { check_database } from "infra/services_status.js";

async function status(req, res) {
  const updatedAt = new Date().toISOString();

  const { status, db_version, db_max_connections, db_current_connections } =
    await check_database();

  res.status(200).json({
    updated_at: updatedAt,
    db_version: db_version,
    db_max_connections: db_max_connections,
    db_current_connections: db_current_connections,
    status: status,
  });
}

export default status;
