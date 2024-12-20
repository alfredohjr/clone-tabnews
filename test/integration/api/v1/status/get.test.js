test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const body = await response.json();
  console.log(body);

  expect(body.updated_at).toBeDefined();
  expect(body.db_version).toBeDefined();
  expect(body.db_max_connections).toBeDefined();
  expect(body.db_current_connections).toBeDefined();

  expect(response.status).toBe(200);
});
