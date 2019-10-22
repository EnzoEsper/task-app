const express = require("express");
// because we dont grab anything to the file, calling require ensure that the file runs
// and its going to ensure that mongoose connects to the db
require("./db/mongoose");
const User = require("./models/user");

const app = express();
const port = process.env.PORT || 3000;

// Automatically parse incoming JSON'S to an object
app.use(express.json());

app.post("/users", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.listen(port, () => {
  console.log("Server is up on port", port);
});
