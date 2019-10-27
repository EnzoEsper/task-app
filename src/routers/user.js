const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = new express.Router();

// creating an user
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
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

// Logging in user
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

// logging out the user from a individual session
router.post("/users/logout", auth, async (req, res) => {
  try {
    // removing the corresponding token from the array of tokens of an user and save it
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

// logging out the user from all sessions removing all the tokenks from the array
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

// returns the profile of an user when is authenticated
// passing the middleware as a second arg
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);

  // this code was user to fetch all users and only for practice some REST functionallity
  // this is going to fetch all the users stored in the db
  // try {
  //   const users = await User.find({});
  //   res.send(users);
  // } catch (error) {
  //   res.status(500).send();
  // }
});

// fetching a individual user by id
router.get("/users/:id", async (req, res) => {
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
router.patch("/users/:id", async (req, res) => {
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
    // the findByIdAndUpdate bypasses mongoose and performs a direct operation to the db
    // so that the middleware dont executes when an user is updated
    // const user = await User.findByIdAndUpdate(_id, req.body, {
    //   new: true, // returns the new user as opposed to the existing one that was found
    //   runValidators: true
    // });

    // We adjust the code to this, in order to get the middleware being executed
    const user = await User.findById(_id);

    updates.forEach(update => {
      user[update] = req.body[update];
    });

    await user.save();

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// deleting a user
router.delete("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(_id);

    if (!user) {
      res.status(404).send();
    }

    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
