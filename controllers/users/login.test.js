const app = require("../../app");
const request = require("supertest");
// початок тесту у "" що тестим потім тестеровщик
describe("POST /users/login", () => {
  test("Should return user (email and subscription), token", async () => {
    const testData = {
      email: "*",
      password: "*",
    };

    const response = await request(app).post("/api/users/login").send(testData);
// expect функція джеста оримує резл і пакує в об'єкт
// якщо рез === що в ту бі тест пройшли
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: {
          email: expect.any(String),
          subscription: expect.any(String),
        },
      })
    );
  });

  it("should return unathorized error", async () => {
    const testData = {
      email: "*",
      password: "*",
    };

    const response = await request(app).post("/api/users/login").send(testData);

    expect(response.statusCode).toBe(401);
  });
});