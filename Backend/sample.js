// // const { uploadOnCloudinary } = require("./utils/cloudinary");

// // (async () => {
// //     const localFilePath = "C:/Pictures/IMG-20210129-WA0018.jpg"; // Fixed path issue
// //     const result = await uploadOnCloudinary(localFilePath);

// //     if (result) {
// //         console.log("Cloudinary Upload Result done");
// //     } else {
// //         console.error("Cloudinary Upload Failed");
// //     }
// // })();


// const students_model = require("./models/students_model.js");
// const bcrypt = require("bcryptjs");
// const { uploadOnCloudinary } = require("./utils/cloudinary.js");

// const register = async (req, res) => {
//   try {
//     // Log request body and uploaded files
//     console.log("Request Body:", req.body);
//     console.log("Uploaded Files:", req.files);

//     // Initialize URLs
//     let idCardUrl = null;
//     let idProofUrl = null;
//     let receiptHostelUrl = null;
//     let receiptMessUrl = null;

//     // Upload files to Cloudinary and log responses
//     if (req.files && req.files["id_card"]) {
//       const idCardFilePath = req.files["id_card"][0].path;
//       console.log("Uploading ID Card File Path:", idCardFilePath);

//       const idCardUpload = await uploadOnCloudinary(idCardFilePath);
//       console.log("Cloudinary Response for ID Card:", idCardUpload);

//       idCardUrl = idCardUpload?.url;
//     }

//     if (req.files && req.files["id_proof"]) {
//       const idProofFilePath = req.files["id_proof"][0].path;
//       console.log("Uploading ID Proof File Path:", idProofFilePath);

//       const idProofUpload = await uploadOnCloudinary(idProofFilePath);
//       console.log("Cloudinary Response for ID Proof:", idProofUpload);

//       idProofUrl = idProofUpload?.url;
//     }

//     if (req.files && req.files["receipt_hostel"]) {
//       const receiptHostelFilePath = req.files["receipt_hostel"][0].path;
//       console.log("Uploading Hostel Receipt File Path:", receiptHostelFilePath);

//       const receiptHostelUpload = await uploadOnCloudinary(receiptHostelFilePath);
//       console.log("Cloudinary Response for Hostel Receipt:", receiptHostelUpload);

//       receiptHostelUrl = receiptHostelUpload?.url;
//     }

//     if (req.files && req.files["receipt_mess"]) {
//       const receiptMessFilePath = req.files["receipt_mess"][0].path;
//       console.log("Uploading Mess Receipt File Path:", receiptMessFilePath);

//       const receiptMessUpload = await uploadOnCloudinary(receiptMessFilePath);
//       console.log("Cloudinary Response for Mess Receipt:", receiptMessUpload);

//       receiptMessUrl = receiptMessUpload?.url;
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
//       password,
//     } = req.body;

//     console.log("Extracted Fields:", {
//       username,
//       reg_no,
//       email,
//       hostel_fees,
//       mess_fees,
//     });

//     // Validate required fields
//     if (!username || !email || !password) {
//       return res.status(400).json({ message: "Required fields are missing." });
//     }

//     // Validate receipt conditions
//     if ((hostel_fees === "Full Fees" || hostel_fees === "Partially Paid") && !receiptHostelUrl) {
//       return res.status(400).json({ message: "Receipt for hostel fees is required." });
//     }

//     if ((mess_fees === "Full Fees" || mess_fees === "Partially Paid") && !receiptMessUrl) {
//       return res.status(400).json({ message: "Receipt for mess fees is required." });
//     }

//     // Encrypt password and log it (not the actual hash for security)
//     console.log("Hashing Password...");
//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log("Password Hashed Successfully");

//     // Create a new student record
//     console.log("Creating New Student Record...");
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
//       id_card: idCardUrl,
//       id_proof: idProofUrl,
//       receipt_hostel: receiptHostelUrl,
//       receipt_mess: receiptMessUrl,
//       permanent_addr,
//       father_name,
//       parents_num,
//       localgardian_num,
//       password: hashedPassword,
//     });
//     console.log("Student Record Created Successfully:", studentCreated);

//     // Respond with success
//     res.status(201).json({
//       msg: "Registration Successful",
//       token: await studentCreated.generateToken(),
//       userid: studentCreated._id.toString(),
//     });
//   } catch (error) {
//     console.error("Error in Registration:", error);
//     res.status(500).json({ error: "Internal Server Error", details: error.message });
//   }
// };

// module.exports = { register };


const bcrypt = require("bcryptjs");

const password = "saru"; // The password you want to hash

bcrypt.hash(password, 10, (err, newHash) => {
    if (err) {
        console.error("Error hashing password:", err);
    } else {
        console.log("New Hashed Password:", newHash);
    }
});
