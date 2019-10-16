const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true
});

const User = mongoose.model("User", {
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

const me = new User({
  name: "Freud                ",
  email: "          enzo@DaDaLiFe.com"
});

me.save()
  .then(me => {
    console.log(me);
  })
  .catch(error => {
    console.log("Error!", error);
  });

const Task = mongoose.model("Task", {
  description: {
    type: String
  },
  completed: {
    type: Boolean
  }
});

// const task = new Task({
//   description: "Learn the mongoose library",
//   completed: false
// });

// task
//   .save()
//   .then(task => {
//     console.log(task);
//   })
//   .catch(error => {
//     console.log(error);
//   });
