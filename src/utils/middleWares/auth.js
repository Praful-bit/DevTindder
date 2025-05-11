const jwt = require("jsonwebtoken");
const User = require("../../models/user");

const userAuth = async (req, res, next) => {
  try {
    // read the token from the req cookies
    const { token } = req.cookies;

    // validate the token
    if (!token) {
      throw new Error("Token is not valid..!");
    }
    const deCodedObj = await jwt.verify(token, "DEV@TINDER$790");
    // find the user
    const { _id } = deCodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found..!");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = {
  userAuth,
};
