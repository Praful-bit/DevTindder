const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../utils/middleWares/auth");
const bcrypt = require("bcrypt");
const {
  ValidationForProfileEdit,
  validatePasswordUpdate,
} = require("../utils/validation/validation");
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("user does not exist");
    }
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!ValidationForProfileEdit(req)) {
      throw new Error("Invalid Edit request..!");
    }
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName}, Your Profile was updated successfully...!`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    validatePasswordUpdate(req); // Run validator

    const user = req.user;
    const { password } = req.body;

    // Hash the new password (using bcrypt for example)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password
    user.password = hashedPassword;
    await user.save();

    res.send("Password updated successfully!");
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});


module.exports = profileRouter;
