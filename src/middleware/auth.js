const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    // Taken the toquen from the header of the request
    const token = req.header("Authorization").replace("Bearer ", "");
    // Decoding the token with jwt and the same secret key used to generate it
    const decoded = jwt.verify(token, "thisisthetoken");

    // Verifying if the user exists fetching an user with the id decoded from the token
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token // this verify if the token is still valid and not expired (this is gonna look for a user that has a given token value in one of their array items)
    });

    // if the user dont exist throws an error (the catch handles the error)
    if (!user) {
      throw new Error();
    }

    // we also add the token to the request so it can be used by the route handler for logout
    req.token = token;
    // if the user exists, we store the user to the request so the route handler dont have to fetch it again and save resources
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate. " });
  }
};

module.exports = auth;
