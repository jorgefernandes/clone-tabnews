import database from "infra/database.js";
async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const serverVersionResult = await database.query("SHOW SERVER_VERSION;");
  const serveVersion = serverVersionResult.rows[0].server_version;
  const maxConnectionsResult = await database.query("SHOW max_connections;");
  const maxConnections = parseInt(maxConnectionsResult.rows[0].max_connections);
  const openedConnectionsResult = await database.query({
    text: "SELECT numbackends from pg_stat_database WHERE datname = $1;",
    values: [process.env.POSTGRES_DB],
  });

  const openedConnections = openedConnectionsResult.rows[0].numbackends;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        max_connections: maxConnections,
        version: serveVersion,
        opened_connections: openedConnections,
      },
    },
  });
}

export default status;
