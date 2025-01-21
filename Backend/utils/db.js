const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;
console.log(URI);
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
