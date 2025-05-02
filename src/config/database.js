const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://Praful:9QDQihF5n0aGDZBq@prafulnode.hwwt9ju.mongodb.net/devTinder")
};

module.exports = connectDB;
