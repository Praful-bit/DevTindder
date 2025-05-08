const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const user = require("./models/user");

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
