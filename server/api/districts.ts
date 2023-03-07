import Client from "pg/lib/client.js";

export default defineEventHandler(async (event) => {
  const client = new Client();
  const query = getQuery(event);
  await client.connect();
  const { rows } = await client.query(
    `SELECT * FROM district WHERE lower("LEA_NAME") LIKE '%' || lower($1) || '%' LIMIT 10`,
    [query.name]
  );
  await client.end();
  return rows;
});
