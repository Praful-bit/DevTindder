const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());
app.post("/signup", async (req, res) => {
  // console.log(req.body)

  // const userObj = {
  //   firstName: "Ayush",
  //   lastName: "Motta",
  //   emailId: "ayush00@gmail.com",
  //   password: "ayush15",
  //   age: 23,
  //   gender: "Gay",
  // };

  // creating a new instance of the user modle
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User added successfully");
  } catch (error) {
    res.status(400).send("Error saving the user:" + error.message);
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
