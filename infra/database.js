import { Client } from "pg";

async function query(QueryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  });
  await client.connect();
  const result = await client.query(QueryObject);
  await client.end();
  return result;
}

export default {
  query: query,
};
