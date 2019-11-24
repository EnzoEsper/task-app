// This contains all the code neccesary to set the db up for testing
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../src/models/user");

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

const setupDatabase = async () => {
  // Deleting all users from the db everytime a test is run, to start from a empty db to all tests
  await User.deleteMany();
  // Creating an example user for testing the login endpoint case
  await new User(userOne).save();
};

module.exports = {
  userOneId,
  userOne,
  setupDatabase
};
