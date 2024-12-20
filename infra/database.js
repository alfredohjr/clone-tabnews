import { Client } from "pg";

async function query(QueryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  });

  try {
    await client.connect();
    const result = await client.query(QueryObject);
    return result;
  } catch (error) {
    console.error("Error running query", error);
    throw error;
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};
