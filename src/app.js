const express = require("express");

const app = express();

const {adminAuth,userAuth} = require('./utils/middleWares/auth')

// GET /user ===> it checks all the app.xxx("matching routes") functions  when it find the function that
// actualy give res back its call express work

//app.user('/routes', rh,[rh2.rh3],rh4,rh5)

// handle auth midleware for all GET request Get, Post
app.use("/admin",adminAuth)

app.get("/user",userAuth,(req,res)=>{
  res.send("Here you have no any user data")
})
app.get("/admin/getAllData", (req, res, next) => {
  res.send("Get all data");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted a user");
});

app.listen(3000, () => {
  console.log("All things are ok!!");
});
