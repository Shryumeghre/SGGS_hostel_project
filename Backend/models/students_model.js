const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const studentsSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    reg_no: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    dept: {
        type: String,
        required: true,
    },
    year_of_study: {
        type: Number,
        required: true,
        min: 1, // Minimum year of study
        max: 5, // Assuming a maximum of 5 years
    },
    dob: {
        type: Date,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    hostel: {
        type: String,
        enum: ["Krishna", "Godavari", "Deogiri", "Nandgiri", "Sahayadri"], // Example hostels, adjust as needed
        required: true,
    },
    hostel_fees: {
        type: String,
        enum: ["Yes", "No"], // Yes or No options
        required: true,
    },
    mess_fees: {
        type: String,
        enum: ["Yes", "No"], // Yes or No options
        required: true,
    },
    room_alloted: {
        type: String,
        required: true,
    },
    id_card: {
        type: String, // Will store the Cloudinary URL
        //required: true,
    },
    id_proof: {
        type: String, // Will store the Cloudinary URL
        //required: true,
    },
    permanent_addr: {
        type: String,
        required: true,
    },
    father_name: {
        type: String,
        required: true,
    },
    parents_num: {
        type: String,
        required: true,
    },
    localgardian_num: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
});

// bcrypt password
// pre method has diff methods like save
// save(method) means before middleware stores data into db, these method will run
studentsSchema.pre("save", async function(next){
    // console.log("pre method", this);  //data will show on terminal
    const user = this;

    if(!user.isModified('password')){
        next(); //next() is middleware which means if password is not changed, go to next step
    }
    try{
        // const saltRound = 10;// when we hash psswrd we have to set it, more large now. more complex the passowrd is 
        const saltRound = await bcrypt.genSalt(10); //2nd method
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    }catch(error){
        next(error);
    }
})

// json web token

//with the help of userSchema.methods we can create many function and access on every page(controller)
studentsSchema.methods.generateToken = async function(){
    try{
        return jwt.sign({
            // these all 3's are payloads
            userId: this._id.toString(),
            email: this.email,
            reg_no: this.reg_no,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "30d",
        }
    );
    }catch(error){
        console.error(error);
    }
};


// Create the StudentUser model
const StudentUser = new mongoose.model("StudentUser", studentsSchema);
// Export the model
module.exports = StudentUser;
