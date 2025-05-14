const express = require("express");
const feedRouter = express.Router();

const { userAuth } = require("../utils/middleWares/auth");

feedRouter.get("/feed", userAuth, async (req, res) => {
  try {
    //findOne use for one data
    const user = req.user;
    if (!user) {
      throw new Error("user does not exist");
    }
    res.send(user);
  } catch (error) {
    res.status(400).send("Error fetching the user: " + error.message);
  }
});

module.exports = feedRouter