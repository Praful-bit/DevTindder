const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("")
};

connectDB().then(()=>{
    console.log("We are Connected Successfully...")
}).catch((err)=>{
console.log(err,"Connection failed")
})
