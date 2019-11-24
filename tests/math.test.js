const { add } = require("../src/math");

test("Hello world", () => {});

// test("Async test demo!", done => {
//   setTimeout(() => {
//     expect(1).toBe(2);
//     done();
//   }, 2000);
// });

test("Should add two numbers", done => {
  add(2, 3).then(sum => {
    expect(sum).toBe(5);
    done();
  });
});

test("Should add two numbers", async () => {
  const sum = await add(22, 3);
  expect(sum).toBe(25);
});
