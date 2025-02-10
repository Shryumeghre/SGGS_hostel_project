const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const student_models = require("../models/students_model");
const rector_models = require("../models/Rector");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // Find user in student models
        let user = await student_models.findOne({ email });
        let role = "student";

        // If not found, find user in rector models
        if (!user) {
            user = await rector_models.findOne({ email });
            role = user ? user.role : null;
        }

        // If user not found
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Compare passwords
        // const isPasswordValid = await bcrypt.compare(password, user.password);
        // console.log(password);
        // console.log(user.password);
        // console.log(isPasswordValid);

        console.log("Entered Password:", password);
console.log("Stored Hashed Password:", user.password);
const isPasswordValid = await bcrypt.compare(password, user.password);
console.log("Password Match Result:", isPasswordValid);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                role,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "30d" } // Token expiration
        );

        // Successful login response
        res.status(200).json({
            message: "Login successful.",
            token,
            user: {
                id: user._id,
                email: user.email,
                role,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

module.exports = login;