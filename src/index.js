const express = require("express");
// because we dont grab anything to the file, calling require ensure that the file runs
// and its going to ensure that mongoose connects to the db
require("./db/mongoose");
// Importing the routers
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

// REGISTERING MIDDLEWARE TEST
// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("GET requests are disabled");
//   } else {
//     next();
//   }
// });

// app.use((req, res, next) => {
//   res.status(503).send("This site is in maintenance. Try it later.");
// });

// Automatically parse incoming JSON'S to an object
app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port", port);
});

// JSON WEB TOKEN PLAYGROUND
// const jwt = require("jsonwebtoken");

// const myFunction = async () => {
//   const token = jwt.sign({ _id: "abc123" }, "thisismyfirsttoken", {
//     expiresIn: "0 seconds"
//   });

//   console.log(token);

//   const data = jwt.verify(token, "thisismyfirsttoken");
//   console.log(data);
// };

// myFunction();

// // toJSON FUNCTION PLAYGROUND
// const pet = {
//   name: "Flipper"
// };

// // when we setup toJSON it is gonna get called whenever the object gets stringified
// // so, we can manipulate what exactly comes back when we stringify an object by returning
// // what we want from here
// // NODEMON STRINGIFY THE OBJECTS IMPLICITELY SO THE FUNCTION userSchema.methods.toJSON in
// // the models executes ever, and we hide the data that we want
// pet.toJSON = function() {
//   return {};
// };

// console.log(JSON.stringify(pet));
