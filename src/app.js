const express = require("express");


const app = express()

app.use('/hello',(req, res)=>{
    res.send("Hello from the Hello")
})

app.use('/',(req, res)=>{
    res.send("Hello from the server deshboard ")
})

app.listen(3000,()=>{
    console.log("Server is listening on the port 3000")
})