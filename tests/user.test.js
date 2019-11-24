const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { userOneId, userOne, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should sign up a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Andrew",
      email: "andrew@example.com",
      password: "andrew123!"
    })
    .expect(201);

  // Assert that the db was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assertions about the response
  // expect(response.body.user.name).toBe("Andrew")  //if we want to assert just one property
  expect(response.body).toMatchObject({
    user: {
      name: "Andrew",
      email: "andrew@example.com"
    },
    token: user.tokens[0].token
  });

  // Making sure that the plaint text password is not stored in the db
  expect(user.password).not.toBe("andrew123!");
});

test("Should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password
    })
    .expect(200);

  // making sure that the new token is saved
  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test("Should not login nonexistent user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: "thisisnotmypassword"
    })
    .expect(400);
});

// testing the endpoint to fetching the user profile (requires auth)
test("Should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not get profile for unauthenticated user", async () => {
  await request(app)
    .get("/users/me")
    .send()
    .expect(401);
});

// testing the endpoint to deleting an user account (requires auth)
test("Should delete the account for authenticated user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  // Validating that the user is removed
  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test("Should not delete the account for unauthenticated user", async () => {
  await request(app)
    .delete("/users/me")
    .send()
    .expect(401);
});

test("Should upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/profile-pic.jpg")
    .expect(200);

  const user = await User.findById(userOneId);
  // toEqual() does not use the === operator and uses an algorithm, expect({}).toEqual({}) returns true
  // expect.any() this takes the constructor function for some sort of type and is going to check if what you are looking at is indeed of that type
  expect(user.avatar).toEqual(expect.any(Buffer));
  // expect({}).toBe({}) // this returns false because uses the === operator and the objects are in diferents space in memory
});

test("Should update valid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Gustavo"
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.name).toEqual("Gustavo");
});

test("Should not update invalid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      height: 18.3
    })
    .expect(400);
});
