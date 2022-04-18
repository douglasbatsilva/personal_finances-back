const { validUser } = require("./register.cases");
const app = require("../src/server");
const request = require("supertest")(app);

describe("Registration", () => {
  test("Should Create a New User", async () => {
    const res = await request.post("/signup").send(validUser);
    expect(res.status).toBe(200);
  });

  test("Should Create a New User", async () => {
    const res = await request.post("/signup").send(validUser);
    expect(res.status).toBe(200);
  });

  test("Should Remove an User", async () => {
    const res = await request.post("/delete").send({ email: validUser.email });
    expect(res.status).toBe(200);
  });
});
