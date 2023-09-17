const app = require("./app");
const userModel = require("./models/userModel");
const request = require("supertest")(app);

describe("EventAPI", () => {
  beforeEach(() => {
    userModel.clearDatabase();
  });

  test("GET /users - Evento existente", async () => {
    const event = await userModel.addUser({
      id: "1",
      name: "Danilo",
      email: "teste1@asd.com",
      password: "123456",
    });
    const response = await request.get("/users");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toStrictEqual(
      expect.objectContaining({
        id: "1",
        name: "Danilo",
        email: "teste1@asd.com",
        password: "123456",
      })
    );
  });

  test("GET /users/:id - Evento existente", async () => {
    const event = await userModel.addUser({
      id: "222",
      name: "Danilo",
      email: "teste1@asd.com",
      password: "123456",
    });

    const response = await request.get(`/users/${event.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toStrictEqual(
      expect.objectContaining({
        id: "222",
        name: "Danilo",
        email: "teste1@asd.com",
        password: "123456",
      })
    );
  });

  test("GET /users/:id - Evento não existente", async () => {
    const event = await userModel.addUser({
      id: "1",
      name: "Danilo",
      email: "teste1@asd.com",
      password: "123456",
    });

    const response = await request.get(`/users/${event.id}123123`);
    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual(
      expect.objectContaining({
        error: "Event not found",
        code: 404,
      })
    );
  });

  test("POST /users - Evento existente", async () => {
    const response = await request.post("/users").send({
      id: "1",
      name: "Danilo",
      email: "teste1@asd.com",
      password: "123456",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toStrictEqual(
      expect.objectContaining({
        id: "1",
        name: "Danilo",
        email: "teste1@asd.com",
        password: "123456",
      })
    );
  });

  test("PUT /users/:id - Evento existente", async () => {
    const event = await userModel.addUser({
      id: "2",
      name: "2Danilo",
      email: "2teste@asd.com",
      password: "123456",
    });

    const response = await request.put(`/users/${event.id}`).send({
      id: "3",
      name: "3Danilo",
      email: "3teste@asd.com",
      password: "3123456",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(
      expect.objectContaining({
        id: "3",
        name: "3Danilo",
        email: "3teste@asd.com",
        password: "3123456",
      })
    );
  });

  test("PUT /users/:id - Evento não existente", async () => {
    const event = await userModel.addUser({
      id: "2",
      name: "2Danilo",
      email: "2teste@asd.com",
      password: "123456",
    });

    const response = await request.put("/users/assd").send({
      id: "2",
      name: "2Danilo",
      email: "2teste@asd.com",
      password: "123456",
    });
    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual(
      expect.objectContaining({
        error: "Event not found",
        code: 404,
      })
    );
  });

  test("DELETE /users/:id - Evento existente", async () => {
    const event = await userModel.addUser({
      id: "1",
      name: "Danilo",
      email: "teste1@asd.com",
      password: "123456",
    });
    const response = await request.delete(`/users/${event.id}`);
    expect(response.statusCode).toBe(204);
  });

  test("DELETE /users/:id - Evento não existente", async () => {
    const response = await request.delete("/users/asd");
    expect(response.statusCode).toBe(404);
  });
});
