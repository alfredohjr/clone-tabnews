import database from "infra/database.js";

async function check_database() {
  const status = await database.query("SELECT 1+1 as status;");
  const db_version = await database.query(
    "SELECT current_setting('server_version') AS version;",
  );
  const db_max_connections = await database.query(
    "SELECT current_setting('max_connections') AS db_max_connections;",
  );
  const db_current_connections = await database.query({
    text: `SELECT COUNT(*) AS db_active_connections FROM pg_stat_activity where datname = $1;`,
    values: [process.env.POSTGRES_DB],
  });

  return {
    status: status["rows"][0].status,
    db_version: db_version["rows"][0].version,
    db_max_connections: db_max_connections["rows"][0].db_max_connections,
    db_current_connections:
      db_current_connections["rows"][0].db_active_connections,
  };
}

export { check_database };
