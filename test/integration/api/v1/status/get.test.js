import orchestrator from "test/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Running pending migrations", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");

      const body = await response.json();
      console.log(body);

      expect(body.updated_at).toBeDefined();
      expect(body.db_version).toBeDefined();
      expect(body.db_max_connections).toBeDefined();
      expect(body.db_current_connections).toBeDefined();

      expect(response.status).toBe(200);
    });
  });
});
