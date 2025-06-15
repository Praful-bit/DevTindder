const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const { validationSignupData } = require("../utils/validation/validation");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    // console.log(req.body)

    // const userObj = {
    //   firstName: "Ayush",
    //   lastName: "Motta",
    //   emailId: "ayush00@gmail.com",
    //   password: "ayush15",
    //   age: 23,
    //   gender: "Gay",
    // };

    const { firstName, lastName, emailId, password } = req.body;

    //validation data here
    validationSignupData(req);

    //encription for password by using bcrypt
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // creating a new instance of the user modle
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Email Id is not Present in DB..!");
    }
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      //JWT token how to make
      const token = await user.getJWT();

      // cookies
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send(user);
    } else {
      throw new Error("Password is not valid");
    }
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now())});
    res.send("LogOut successfully...!!")
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});

module.exports = authRouter;
