import database from "infra/database";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("GET to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");

  const body = await response.json();

  expect(response.status).toBe(200);
  expect(Array.isArray(body)).toEqual(true);
});