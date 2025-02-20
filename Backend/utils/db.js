const mongoose = require("mongoose");
require('dotenv').config();


const URI = process.env.MONGODB_URI;
console.log("Connecting to MongoDB");
const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("MongoDB Connected");
    }catch(error){
        console.error(error.message);
        console.error("Connection failed");
        process.exit(0);
    }
    
};

module.exports = connectDb;
