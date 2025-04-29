const express = require("express");

const app = express();

//app.user('/routes', rh,[rh2.rh3],rh4,rh5)

app.get(
  "/user",[
  (req, res, next) => {
    console.log("hey here no any responce")
    next()
    // res.send("Responce !!");
  },
  (req, res, next) => {
    console.log("here is 2 responce")
    // res.send("hey Responce 2!");
    next()
  }],
  (req, res, next) => {
    console.log("here is 3 responce")
    // res.send("hey Responce 3!");
    next()
  },
  (req, res, next) => {
    console.log("here is 4 responce")
    res.send("hey Responce 4!");
    next()
  }
);

app.listen(3000, () => {
  console.log("All things are ok!!");
});
