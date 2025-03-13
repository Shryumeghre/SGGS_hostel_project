const Rector = require("../models/Rector");
// const bcrypt = require("bcrypt");
const macaddress = require("macaddress");

const signupRector = async (req, res) => {
  const { name, email, mobile, address, password, confirmPassword, role } = req.body;

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
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};

const StudentUser = require("../models/students_model");

const updateMAC = async (req, res) => {
    try {
        const { studentId } = req.params;
        const { macAddresses } = req.body;

        // Ensure maximum 2 MAC addresses
        if (!Array.isArray(macAddresses) || macAddresses.length > 2) {
            return res.status(400).json({ message: "Provide up to 2 MAC addresses." });
        }

        // Update MAC addresses
        const updatedStudent = await StudentUser.findByIdAndUpdate(
            studentId,
            { macAddresses },
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found." });
        }

        res.status(200).json({
            message: "MAC addresses updated successfully.",
            student: updatedStudent,
        });
    } catch (error) {
        console.error("Error updating MAC addresses:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { updateMAC };

module.exports = { signupRector, updateMAC };
