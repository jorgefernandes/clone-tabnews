import database from "infra/database.js";

async function status(request, response) {
  const result = await database.query("SELECT 1 + 1");

  response.setHeader("Content-Type", "text/plain; charset=utf-8");
  response.status(200).json({ message: "é realmente uma benção isso aqui!" });
}

export default status;
