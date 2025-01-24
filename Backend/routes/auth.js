const express = require("express");
// const bcrypt = require("bcrypt");
const Rector = require("../models/Rector");
const upload = require("../middlewares/upload");
const router = express.Router();

router.post("/signup", upload.single("idProof"), async (req, res) => {
  const { name, email, mobile, address,password, confirmPassword,role } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  try {
    const existingUser = await Rector.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const newRector = new Rector({
      name,
      email,
      mobile,
      address,
      idProof: req.file.filename,
      password,
      role,
    });
    await newRector.save();

    res.status(201).json({ message: "User registered successfully", Rector: newRector });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

module.exports = router;
