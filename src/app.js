const express = require("express");


const app = express()

app.use('/hello/0/2',(req, res)=>{
    res.send("Avra ka dabra gili gili chuuuu !!")
})


app.use('/hello/2',(req, res)=>{
    res.send("Avra ka dabra !!")
})


app.use('/hello',(req, res)=>{
    res.send("Hello from the Hello")
})


app.use('/test',(req, res)=>{
    res.send("Hello from the test server")
})

app.use('/',(req, res)=>{  //wild card (any thing when match after the / it gives response hello from the server deshboard)
    res.send("Hello from the server deshboard ")
})

app.listen(7777,()=>{
    console.log("Server is listening on the port 3000")
})