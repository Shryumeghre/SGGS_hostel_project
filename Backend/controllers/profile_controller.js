const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const student_models = require("../models/students_model");
const router = express.Router();


router.get("/profile", authMiddleware, async (req, res) => {
    console.log("Extracted User ID:", req.user.userId);
    
    const student = await student_models.findById(req.user.userId);
    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
});

module.exports = router; 
