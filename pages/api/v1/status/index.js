import database from "infra/database.js";

export default async function status(req, res) {
  const updatedAt = new Date().toISOString();

  const databaseVersion = await database.query("SHOW server_version;");
  const oppenedConnectionsResult = await database.query(
    "SELECT * FROM pg_stat_activity WHERE datname = 'local_db';"
  );

  res.status(200).json({
    updated_at: updatedAt,
    dependecies: {
      database: {
        version: databaseVersion.rows[0].server_version,
        currentConnections: oppenedConnectionsResult.rowCount,
      },
    },
  });
}
