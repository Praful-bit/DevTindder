const express = require("express");

const app = express();

// GET /user ===> it checks all the app.xxx("matching routes") functions  when it find the function that
// actualy give res back its call express work

//app.user('/routes', rh,[rh2.rh3],rh4,rh5)

app.get("/admin/getAllData", (req, res, next) => {
  //logic of check if the request is authorized
  const token = "xyz";
  const isAdminAuthorized = token === "xyz1222";
  if (isAdminAuthorized) {
    res.send("All Data sent");
  }else{
    res.status(401).send("unAuthorized request")
  }
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted a user");
});

app.listen(3000, () => {
  console.log("All things are ok!!");
});
