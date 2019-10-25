require("../src/db/mongoose");
const User = require("../src/models/user");

// Use promise chaingin to do one thing after another
// We update the age of a certain user and then we fetch all users with the same age
// User.findByIdAndUpdate("5da6a41f8924b01e4896e45e", { age: 17 })
//   .then(user => {
//     console.log(user);
//     return User.countDocuments({ age: 17 });
//   })
//   .then(result => {
//     console.log(result);
//   })
//   .catch(e => {
//     console.log(e);
//   });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age: age });
  const count = await User.countDocuments({ age: age });
  return count;
};

updateAgeAndCount("5da6a41f8924b01e4896e45e", 33)
  .then(count => {
    console.log(count);
  })
  .catch(e => {
    console.log(e);
  });
