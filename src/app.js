const express = require("express");

const app = express();

// GET /user ===> it checks all the app.xxx("matching routes") functions  when it find the function that
// actualy give res back its call express work

//app.user('/routes', rh,[rh2.rh3],rh4,rh5)

app.get(
    "/user",
    (req, res, next) => {
      console.log("hey here 2 responce")
      res.send("Responce 2!!");
    },
  );

app.get(
  "/user",
  (req, res, next) => {
    console.log("hey here 1 responce")
    // res.send("Responce !!");
    next()
  },
);



app.listen(3000, () => {
  console.log("All things are ok!!");
});
