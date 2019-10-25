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
app.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }

  // user
  //   .save()
  //   .then(() => {
  //     res.status(201).send(user);
  //   })
  //   .catch(e => {
  //     res.status(400).send(e);
  //   });
});

// fetching all the users
app.get("/users", async (req, res) => {
  // this is going to fetch all the users stored in the db
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }
});

// fetching a individual user by id
app.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    // Mongo db not consider a faillure if dont get any result back when were
    // looking for something -> that is consider a success (even is no matches, returns nothing)
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

// Updating a user
app.patch("/users/:id", async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates!" });
  }

  try {
    const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true, // returns the new user as opposed to the existing one that was found
      runValidators: true
    });

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});
// creating a task
app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

//fetching all the tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (error) {
    res.status(500).send();
  }
});

// fetching an individual task
app.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

app.listen(port, () => {
  console.log("Server is up on port", port);
});
