const express = require("express");
// because we dont grab anything to the file, calling require ensure that the file runs
// and its going to ensure that mongoose connects to the db
require("./db/mongoose");
// Importing the routers
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

// REGISTERING MIDDLEWARE
// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("GET requests are disabled");
//   } else {
//     next();
//   }
// });

app.use((req, res, next) => {
  res.status(503).send("This site is in maintenance. Try it later.");
});

// Automatically parse incoming JSON'S to an object
app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port", port);
});

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
