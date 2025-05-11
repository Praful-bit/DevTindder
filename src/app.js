const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validationSignupData } = require("./utils/validation/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

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
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      //JWT token how to make
      const token = await jwt.sign({ _id: user._id }, "DEV@TINDER$790");
      console.log(token);
      // cookies
      res.cookie("token", token);

      res.send("Login Successfully....!");
    } else {
      throw new Error("Password is not valid");
    }
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("Token not Valid...!");
    }
    //validate token
    const deCodedMessage = await jwt.verify(token, "DEV@TINDER$790");
    console.log(deCodedMessage);
    const { _id } = deCodedMessage;
    console.log("Logged in user is : " + _id);
    const user = await User.findById(_id);
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    //findOne use for one data
    const user = await User.find({});
    if (!user) return res.status(404).send("User not found");
    res.send(user);
  } catch (error) {
    res.status(400).send("Error fetching the user: " + error.message);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    // {_id:userId}
    const user = await User.findByIdAndDelete(userId);
    res.send("user Deleted successfully");
  } catch (error) {
    res.status(400).send("Error fetching the user: " + error.message);
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["about", "gender", "age", "skills"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("update is not allowed");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "before",
      runValidators: true,
    });
    console.log(user);
    res.send("user updated successfully..!");
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
