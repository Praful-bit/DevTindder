const mongoose = require("mongoose");
const validator = require("validator");

const contactSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            index:true,
            minLength:4,
            maxLength:25,
        },
        email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
        },
        subject:{
            type:String,
            required:true
        },
        message:{
            type:String,
        }
    }
)

module.exports = mongoose.model("contact",contactSchema)