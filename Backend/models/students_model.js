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
        unique: true,
        trim: true, // Removes leading/trailing spaces
        lowercase: true, // Ensures emails are case-insensitive
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
        enum: ["Full Fees", "Partially Paid", "Not Paid"],
        required: true,
    },
    receipt_hostel: {
        type: String, // URL of the uploaded receipt
        required: function () {
            return this.hostel_fees === "Full Fees" || this.hostel_fees === "Partially Paid";
        },
    },
    mess_fees: {
        type: String,
        enum: ["Full Fees", "Partially Paid", "Not Paid"],
        required: true,
    },
    receipt_mess: {
        type: String, // URL of the uploaded receipt
        required: function () {
            return this.mess_fees === "Full Fees" || this.mess_fees === "Partially Paid";
        },
    },
    room_alloted: {
        type: String,
        required: true,
    },
    id_card: {
        type: String, // Will store the Cloudinary URL
    },
    id_proof: {
        type: String, // Will store the Cloudinary URL
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



studentsSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Skip hashing if password isn't modified

    try {
        // Prevent double hashing
        if (this.password.startsWith("$2a$")) return next();

        this.password = await bcrypt.hash(this.password, 10); // Hash the password correctly
        next();
    } catch (error) {
        next(error);
    }
});



// Generate JWT token
studentsSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                reg_no: this.reg_no,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d",
            }
        );
    } catch (error) {
        console.error(error);
    }
};

// Create the StudentUser model
const StudentUser = new mongoose.model("StudentUser", studentsSchema);

// Export the model
module.exports = StudentUser;
