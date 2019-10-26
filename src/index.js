const express = require("express");
// because we dont grab anything to the file, calling require ensure that the file runs
// and its going to ensure that mongoose connects to the db
require("./db/mongoose");
// Importing the routers
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

// Automatically parse incoming JSON'S to an object
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port", port);
});

const bcrypt = require("bcryptjs");

const myFunction = async () => {
  const pass = "Red12345!";
  const hashedPass = await bcrypt.hash(pass, 8);

  console.log(pass);
  console.log(hashedPass);

  const isMatch = await bcrypt.compare("red12345", hashedPass);
  console.log(isMatch);
};

myFunction();
