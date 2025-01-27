const students_model = require("../models/students_model");
const bcrypt = require("bcryptjs");
const {uploadOnCloudinary} = require("../utils/cloudinary.js");

const register = async (req, res) => {
  try {
    // Log request body and files for debugging
    console.log("Request Body:", req.body);
    console.log("Uploaded Files:", req.files);

    // Initialize URLs
    let idCardUrl = null;
    let idProofUrl = null;

    // Upload files to Cloudinary
    if (req.files && req.files["id_card"]) {
      const idCardFilePath = req.files["id_card"][0].path; // Local file path
      const idCardUpload = await uploadOnCloudinary(idCardFilePath);
      idCardUrl = idCardUpload?.url; // Cloudinary URL
    }

    if (req.files && req.files["id_proof"]) {
      const idProofFilePath = req.files["id_proof"][0].path; // Local file path
      const idProofUpload = await uploadOnCloudinary(idProofFilePath);
      idProofUrl = idProofUpload?.url; // Cloudinary URL
    }

    // Extract other form fields
    const {
      username,
      reg_no,
      gender,
      email,
      dept,
      year_of_study,
      dob,
      phone,
      hostel,
      hostel_fees,
      mess_fees,
      room_alloted,
      id_card, // Save Cloudinary URL
      id_proof,
      permanent_addr,
      father_name,
      parents_num,
      localgardian_num,
      password
    } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new student record
    const studentCreated = await students_model.create({
      username,
      reg_no,
      gender,
      email,
      dept,
      year_of_study,
      dob,
      phone,
      hostel,
      hostel_fees,
      mess_fees,
      room_alloted,
      id_card: idCardUrl, // Save Cloudinary URL
      id_proof: idProofUrl, // Save Cloudinary URL
      permanent_addr,
      father_name,
      parents_num,
      localgardian_num,
      password: hashedPassword
    });

    // Respond with success
    res.status(201).json({
      msg: "Registration Successful",
      token: await studentCreated.generateToken(),
      userid: studentCreated._id.toString()
    });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};


module.exports = { register };
