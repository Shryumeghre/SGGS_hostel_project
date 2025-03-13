const express = require("express");
const { authMiddleware }  = require("../middlewares/authMiddleware");
const student_models = require("../models/students_model");

const router = express.Router();

// Use authMiddleware here
router.get("/profile", authMiddleware, async (req, res) => {
    try {
        console.log("Extracted User ID:", req.user.userId);
        
        const student = await student_models.findById(req.user.userId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json(student);
    } catch (error) {
        console.error("Profile fetch error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
