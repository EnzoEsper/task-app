const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

// Assing the user object to userSchema. This is going to allow us to take adventage
// of the middlewares. When we passing the object as a second argument mongoose coverts
// it to a schema anyways
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("The email is not valid");
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error(`Password cannot contain "password"`);
      }
    }
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be greater than zero");
      }
    },
    default: 0
  }
});

// Using the middleware. The function needs to be a standard function (not an arrow function)
// because the this binding plays an important role and ARROW FUNCTIONS DONT BIND THIS
userSchema.pre("save", async function(next) {
  // the value of this is equal to the document that is being saved
  const user = this; // this is not neccesary but more easy to understand

  // if the password is already hashed, we dont wanna hash it again. We only wanna hash
  // the password if it is modified by the user. This is gonna be true for a new user and
  // when a user modify the pass
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  // when we are done we call next to proceed to save te user
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
