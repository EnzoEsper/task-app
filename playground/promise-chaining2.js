require("../src/db/mongoose");
const Task = require("../src/models/task");

Task.findByIdAndDelete("5dae72207100ac05a0190fd6")
  .then(task => {
    console.log(task);
    return Task.countDocuments({ completed: false });
  })
  .then(result => {
    console.log(result);
  })
  .catch(e => {
    console.log(e);
  });
