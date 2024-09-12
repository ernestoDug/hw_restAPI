// чомусь не вийшло ((((((((((((((((((
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


// const app = require("../../app");
// // для імітації запитів
// const request = require("supertest");

// // початок тесту "що", => чим
// describe("POST  /users/login", () => {
//   it("test route login return user(email, subscrsbe) and token", async () => {
//     const testUsers = { email: "bogeеma@gmail.com", password: "glamuruNet68" };
//     // імітація запиту
//     const response = await request(app).post("/users/login").send(testUsers);
//     // в експект результат його пакує в обект
//     // в ту бі праивльне значення порівнє з експектом
//     // vidvd
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toEqual(
//       expect.objectContaining({
//         token: expect.any(String),

//         user: {
//           email: expect.any(String),
//           subscription: expect.any(String),
//         },
//       })
//     );
//   });
// });
