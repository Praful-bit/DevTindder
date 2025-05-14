const express = require("express");
const connectDB = require("./config/database");
const app = express();

const cookieParser = require("cookie-parser");


const authRouter = require("../src/routes/auth")
const feedRouter = require("../src/routes/feed")
const profileRouter = require("../src/routes/profile")
const requestRouter = require("./routes/request")

app.use(express.json());
app.use(cookieParser());



app.use("/",authRouter)
app.use("/",feedRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)

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
