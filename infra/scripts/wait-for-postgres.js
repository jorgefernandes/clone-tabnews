const { exec } = require("node:child_process");

console.log("🛑 Aguardando postgres abrir conexão...");
function checkPostgresConnection() {
  exec(
    "docker exec postgres-dev pg_isready --host localhost",
    checkingForOpeningConnection,
  );

  function checkingForOpeningConnection(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      checkPostgresConnection();
      return;
    }

    console.log("🟢 Conexão aberta!");
  }
}

checkPostgresConnection();
