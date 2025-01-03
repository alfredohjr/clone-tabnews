import { Client } from "pg";

async function query(QueryObject) {
  let client;

  try {
    client = await getNewClient();
    const result = await client.query(QueryObject);
    return result;
  } catch (error) {
    console.error("Error running query", error);
    throw error;
  } finally {
    await client.end();
  }
}

async function getNewClient() {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    port: process.env.POSTGRES_PORT,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  await client.connect();
  return client;
}

const database = {
  query,
  getNewClient,
};

export default database;
