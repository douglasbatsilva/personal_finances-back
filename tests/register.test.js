const { nonExistentUser, validUser } = require("./register.cases");
const app = require("../src/server");
const request = require("supertest")(app);

describe("Registration", () => {
  test("Should response 200 to register page", async () => {
    const res = await request.get("/register");
    expect(res.status).toBe(200);
  });

  test("Should Create a New User", async () => {
    const res = await request.post("/signup").send(validUser);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User created successfully");
  });

  test("Must Not Create a New User because email not exists", async () => {
    const userWithoutEmail = { ...validUser, email: "" };
    const res = await request.post("/signup").send(userWithoutEmail);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe(
      "The field /email must NOT have fewer than 6 characters"
    );
  });

  test("Must Not Create a New User because passwords are diferents", async () => {
    const userWithDiferentPass = { ...validUser, rePassword: "122222" };
    const res = await request.post("/signup").send(userWithDiferentPass);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Passwords do not match");
  });

  test("Must Not Create a New User because this user name already exists", async () => {
    const res = await request.post("/signup").send(validUser);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("This user name already exists");
  });

  test("Must Not Create a New User because this user email already exists", async () => {
    const newUser = { ...validUser, userName: "testNewUser" };
    const res = await request.post("/signup").send(newUser);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("This user email already exists");
  });

  test("Should Remove an User", async () => {
    const res = await request.post("/delete").send({ email: validUser.email });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User deleted successfully");
  });

  test("Should Not Remove an User beacuse this user non exists", async () => {
    const res = await request
      .post("/delete")
      .send({ email: "notfound@notfound.com" });
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("User not found");
  });
});

describe("Login", () => {
  beforeAll(async () => {
    await request.post("/signup").send(validUser);
  });

  afterAll(async () => {
    await request.post("/delete").send({ email: validUser.email });
  });

  test("Should Login Successfully", async () => {
    const loginUser = {
      user: validUser.userName,
      password: validUser.password,
    };
    const res = await request.post("/signin").send(loginUser);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Login successfully");
  });

  test("Must Not Login because user is fewer than 6 characters", async () => {
    const invalidLoginUser = { user: "", password: validUser.password };
    const res = await request.post("/signin").send(invalidLoginUser);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe(
      "The field /user must NOT have fewer than 6 characters"
    );
  });

  test("Must Not Login because this user not exists", async () => {
    const res = await request.post("/signin").send(nonExistentUser);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("User not found");
  });

  test("Must Not Login because password not match", async () => {
    const loginUser = {
      user: validUser.userName,
      password: "112233",
    };
    const res = await request.post("/signin").send(loginUser);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Password is incorrect");
  });
});

describe("Simulated Develop Env Tests", () => {
  afterAll(async () => {
    await request.post("/delete").send({ email: validUser.email });
  });

  test("Should response 200 to register page", async () => {
    process.env.NODE_ENV = "development"
    const res = await request.get("/register");
    expect(res.status).toBe(200);
  });

  test("Should Create a New User", async () => {
    process.env.NODE_ENV = "development"
    const res = await request.post("/signup").send(validUser);
    expect(res.status).toBe(302);
  });

  test("Should response 200 to login page", async () => {
    process.env.NODE_ENV = "development"
    const res = await request.get("/login");
    expect(res.status).toBe(200);
  });

  test("Should response 200 to home page", async () => {
    process.env.NODE_ENV = "development"
    const res = await request.get("/");
    expect(res.status).toBe(200);
  });
});