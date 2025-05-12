const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validationSignupData } = require("./utils/validation/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./utils/middleWares/auth");

app.use(express.json());
app.use(cookieParser());
app.post("/signup", async (req, res) => {
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
    res.send("User added successfully");
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Email Id is not Present in DB..!");
    }
    const isPasswordValid = await user.validatePassword(password)

    if (isPasswordValid) {
      //JWT token how to make
      const token = await user.getJWT();

      // cookies
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send("Login Successfully....!");
    } else {
      throw new Error("Password is not valid");
    }
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
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

app.get("/feed", userAuth, async (req, res) => {
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

app.post("/sendRequest", userAuth, (req, res) => {
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

connectDB()
  .then(() => {
    console.log("We are Connected Successfully...");
    app.listen(7777, () => {
      console.log("All things are ok!!");
    });
  })
  .catch((err) => {
    console.log(err, "Connection failed");
  });
