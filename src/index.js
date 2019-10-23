const express = require("express");
// because we dont grab anything to the file, calling require ensure that the file runs
// and its going to ensure that mongoose connects to the db
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;

// Automatically parse incoming JSON'S to an object
app.use(express.json());

// creating an user
app.post("/users", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

// fetching all the users
app.get("/users", (req, res) => {
  // this is going to fetch all the users stored in the db
  User.find({})
    .then(users => {
      res.send(users);
    })
    .catch(e => {
      // Internal server error
      res.status(500).send();
    });
});

// fetching a individual user by id
app.get("/users/:id", (req, res) => {
  const _id = req.params.id;

  User.findById(_id)
    .then(user => {
      // Mongo db not consider a faillure if dont get any result back when were
      // looking for something -> that is consider a success (even is no matches, returns nothing)
      if (!user) {
        return res.status(404).send();
      }

      res.send(user);
    })
    .catch(e => {
      res.status(500).send(e);
    });
});

// creating a task
app.post("/tasks", (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(() => {
      res.status(201).send(task);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

//fetching all the tasks
app.get("/tasks", (req, res) => {
  Task.find({})
    .then(tasks => {
      res.send(tasks);
    })
    .catch(e => {
      res.status(500).send();
    });
});

// fetching an individual task
app.get("/tasks/:id", (req, res) => {
  const _id = req.params.id;

  Task.findById(_id)
    .then(task => {
      if (!task) {
        return res.status(404).send();
      }

      res.send(task);
    })
    .catch(() => {
      res.status(500).send();
    });
});

app.listen(port, () => {
  console.log("Server is up on port", port);
});
