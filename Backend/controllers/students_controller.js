const students_model = require("../models/students_model");
const bcrypt = require("bcryptjs");
// const upload = require('../helper/cloudinary.config.js');
// const multerUpload = require('../helper/multer.config.js'); // Import the configured multer instance
const {uploadOnCloudinary} = require("../utils/cloudinary.js");


// // Handle document upload and database update
// const uploadDocuments = async (req, res) => {
//   try {
//     const studentId = req.params.id;

//     // Check if student exists
//     const student = await students_model.findById(studentId);
//     // if (!student) {
//     //   return res.status(404).json({ message: "Student not found" });
//     // }

//     // Update student with Cloudinary URLs
//     student.id_card = req.files.id_card[0].path;
//     student.id_proof = req.files.id_proof[0].path;

//     await student.save();

//     res.status(200).json({
//       message: "Documents uploaded successfully",
//       data: {
//         id_card: student.id_card,
//         id_proof: student.id_proof,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error uploading documents", error });
//   }
// };


// const register = async (req, res) => {
//   try {
//     // Log request body and files for debugging
//     console.log("Request Body:", req.body);
//     console.log("Uploaded Files:", req.files);

//     // Extract file URLs from req.files (uploaded to Cloudinary)
//     let idCardUrl = null;
//     let idProofUrl = null;

//     if (req.files && req.files['id_card']) {
//       const idCardFile = req.files['id_card'][0];
//       if (idCardFile && idCardFile.path) {
//         idCardUrl = idCardFile.path; // Cloudinary URL for id_card
//       }
//     }

//     if (req.files && req.files['id_proof']) {
//       const idProofFile = req.files['id_proof'][0];
//       if (idProofFile && idProofFile.path) {
//         idProofUrl = idProofFile.path; // Cloudinary URL for id_proof
//       }
//     }

//     // Extract other form fields
//     const {
//       username,
//       reg_no,
//       gender,
//       email,
//       dept,
//       year_of_study,
//       dob,
//       phone,
//       hostel,
//       hostel_fees,
//       mess_fees,
//       room_alloted,
//       permanent_addr,
//       father_name,
//       parents_num,
//       localgardian_num,
//       password
//     } = req.body;

//     // If required fields are missing
//     if (!username || !email || !password) {
//       return res.status(400).json({ message: "Required fields are missing." });
//     }

//     // Create a new student
//     const studentCreated = await students_model.create({
//       username,
//       reg_no,
//       gender,
//       email,
//       dept,
//       year_of_study,
//       dob,
//       phone,
//       hostel,
//       hostel_fees,
//       mess_fees,
//       room_alloted,
//       id_card: idCardUrl, // Save Cloudinary URL
//       id_proof: idProofUrl, // Save Cloudinary URL
//       permanent_addr,
//       father_name,
//       parents_num,
//       localgardian_num,
//       password
//     });

//     // Respond with success message
//     res.status(201).json({
//       msg: "Registration Successful",
//       token: await studentCreated.generateToken(),
//       userid: studentCreated._id.toString()
//     });
//   } catch (error) {
//     console.error("Error in registration:", error);
//     res.status(500).json({ error: "Internal Server Error", details: error.message });
//   }
// };


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
