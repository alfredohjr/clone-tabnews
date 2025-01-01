import orchestrator from "test/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

test("POST to /api/v1/migrations should return 200", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  const body1 = await response1.json();

  expect(response1.status).toBe(201);
  expect(Array.isArray(body1)).toEqual(true);
  expect(body1.length).toBeGreaterThan(0);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  const body2 = await response2.json();

  expect(response2.status).toBe(200);
  expect(Array.isArray(body2)).toEqual(true);
  expect(body2.length).toBe(0);
});
