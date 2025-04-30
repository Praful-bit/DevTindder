const express = require("express");

const app = express();



app.get("/getUserData", (req, res) => {
  // try {
    throw new Error("ggauyyuttg");
    res.send("User Data Sent");
  // } catch (err) {
  //   res.status(500).send("some error comes pls contact to sever team");
  // }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong");
  }
});
app.listen(3000, () => {
  console.log("All things are ok!!");
});
