const express = require("express");


const app = express()
//this will match all the http methods api calls to /test
app.use('/test',(req, res)=>{
    res.send("Hello from the test server")
})

app.post("/user", (req,res)=>{
    res.send("hello Your data save in data base")
})

//This will match only get http api 
app.get("/user",(req,res)=>{
    res.send({firstName : "Praful",
        LastName: "Gahlot"
    })
})

app.put('/user',(req,res)=>{
    res.send("update your data successfully!!")
})

app.delete('/user',(req,res)=>{
    res.send("Delete successfully!!")
})

app.listen(7777,()=>{
    console.log("Server is listening on the port 3000")
})