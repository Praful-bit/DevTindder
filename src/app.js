const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Praful",
    lastName: "gahlot",
    emailId: "prafulgahlot00@gmail.com",
    password: "praful7",
    age: 24,
    gender: "Male",
  };
  // creating a new instance of the user modle
  const user = new User(userObj);
  try {
    await user.save();
    res.send("User added successfully");
  } catch (error) {
    res.status(400).send("Error saving the user:" + error.message);
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
