// This contains all the code neccesary to set the db up for testing
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  name: "Mike",
  email: "mike@gmail.com",
  password: "mike12345!",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }
  ]
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "Mike2",
  email: "mike2@gmail.com",
  password: "mike212345!",
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }
  ]
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "First task from suite",
  owner: userOneId
};

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "Second task from suite",
  completed: true,
  owner: userOneId
};

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "Second task from suite",
  completed: true,
  owner: userTwo._id
};

const setupDatabase = async () => {
  // Deleting all users from the db everytime a test is run, to start from a empty db to all tests
  await User.deleteMany();
  // Deleting all tasks from the db
  await Task.deleteMany();
  // Creating an example user for testing the login endpoint case
  await new User(userOne).save();
  await new User(userTwo).save();
  // Creating the three tasks
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

module.exports = {
  userOneId,
  userOne,
  setupDatabase,
  userTwoId,
  userTwo,
  taskOne,
  taskTwo,
  taskThree
};
