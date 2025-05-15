const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../utils/middleWares/auth");
const { ValidationForProfileEdit } = require("../utils/validation/validation");
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
    res.json(
      {message:`${loggedInUser.firstName}, Your Profile was updated successfully...!`, data: loggedInUser}
    );
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = profileRouter;
