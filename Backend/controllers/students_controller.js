const students_model = require("../models/students_model.js");
const bcrypt = require("bcryptjs");
const { uploadOnCloudinary } = require("../utils/cloudinary.js");

// Helper function to get client IP
const getClientIP = (req) => req.headers["x-forwarded-for"] || req.socket.remoteAddress;

const register = async (req, res) => {
  try {
    // Check if the email or registration number already exists in a single query
    const existingStudent = await students_model.findOne({
      $or: [{ email: req.body.email }, { reg_no: req.body.reg_no }],
    });

    if (existingStudent) {
      return res.status(400).json({
        message: existingStudent.email === req.body.email
          ? "Email already exists. Please use a different email."
          : "Registration number already exists. Please use a different one."
      });
    }

     // Capture user's IP address
     const ipAddress = getClientIP(req);

     // Capture user's MAC address (first device during registration)
     const macAddress = await macaddress.one();

    // Initialize file upload promises
    const fileUploadPromises = [];
    const fileUrls = {};

    const fileFields = ["id_card", "id_proof", "receipt_hostel", "receipt_mess"];
    
    fileFields.forEach(field => {
      if (req.files && req.files[field]) {
        const filePath = req.files[field][0].path;
        fileUploadPromises.push(
          uploadOnCloudinary(filePath).then(uploaded => {
            fileUrls[field] = uploaded?.url;
          })
        );
      }
    });

    // Wait for all files to upload simultaneously
    await Promise.all(fileUploadPromises);

    // Extract form fields
    const {
      username, reg_no, gender, email, dept, year_of_study, dob, phone, hostel,
      hostel_fees, mess_fees, room_alloted, permanent_addr, father_name,
      parents_num, localgardian_num, password
    } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    // Validate receipt conditions before saving to DB
    if ((hostel_fees === "Full Fees" || hostel_fees === "Partially Paid") && !fileUrls["receipt_hostel"]) {
      return res.status(400).json({ message: "Receipt for hostel fees is required." });
    }

    if ((mess_fees === "Full Fees" || mess_fees === "Partially Paid") && !fileUrls["receipt_mess"]) {
      return res.status(400).json({ message: "Receipt for mess fees is required." });
    }

    // Create new student record
    const studentCreated = await students_model.create({
      username, reg_no, gender, email, dept, year_of_study, dob, phone, hostel,
      hostel_fees, mess_fees, room_alloted, permanent_addr, father_name,
      parents_num, localgardian_num, password,
      id_card: fileUrls["id_card"],
      id_proof: fileUrls["id_proof"],
      receipt_hostel: fileUrls["receipt_hostel"],
      receipt_mess: fileUrls["receipt_mess"],
      ipAddress, // Store the captured IP address
      macAddresses: [macAddress] // Store the first MAC address in an array
    });

    // Send response without unnecessary logs
    res.status(201).json({
      msg: "Registration Successful",
      token: await studentCreated.generateToken(),
      userid: studentCreated._id.toString(),
    });

  } catch (error) {
    console.error("Error in Registration:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// ✅ Get Student Profile with Access Control
const getStudentById = async (req, res) => {
  try {
      const { studentId } = req.params;
      const student = await students_model.findById(studentId);

      if (!student) {
          return res.status(404).json({ message: "Student not found" });
      }

      // Allow rector/warden to view all details
      if (req.user.role === "rector" || req.user.role === "warden") {
          return res.status(200).json(student);
      }

      // Allow student to view only their own profile (hide IP, MAC, password)
      if (req.user.userId === studentId) {
          const { password, ipAddress, macAddresses, ...safeData } = student.toObject();
          return res.status(200).json(safeData);
      }

      return res.status(403).json({ message: "Access denied." });
  } catch (error) {
      console.error("Error fetching student profile:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { register, getStudentById };
