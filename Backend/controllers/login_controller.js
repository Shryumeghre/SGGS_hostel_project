const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const student_models = require("../models/students_model");
const rector_models = require("../models/Rector");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }
        let user = await student_models.findOne({ email });
        let role = "student";
 
        if (!user) {
            user = await rector_models.findOne({ email });
            role = user && user.role ? user.role : "unknown"; // Default to "unknown" instead of null
        }

        if (!user.password) {
            return res.status(500).json({ message: "User password is missing in the database." });
        }
        
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

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
