const students_model = require("../models/students_model");
const bcrypt = require("bcryptjs");
const upload = require("../helper/multer.config");

const register = async (req, res)=> {
    try{
        console.log(req.body);
        const  {username, 
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
            // id_card,
            // id_proof,
            permanent_addr, 
            father_name, 
            parents_num, 
            localgardian_num, 
            password} = req.body;

        // const saltRound = 10;
        // const hash_password = await bcrypt.hash(password, saltRound);

        const studentCreated = await students_model.create({username, reg_no, gender, email, dept, year_of_study, dob, phone, hostel, hostel_fees, mess_fees, room_alloted, permanent_addr, father_name, parents_num, localgardian_num, password});

        res.status(201).json({ 
          msg: "Registration Successful",   
          token: await studentCreated.generateToken(), 
          userid: studentCreated._id.toString()
        });
    }catch(error){
      res.status(500).json({ error: "Internal Server Error", details: error.message });
      console.log(error);
    }
}

// Handle document upload and database update
const uploadDocuments = async (req, res) => {
    try {
      const studentId = req.params.id;
  
      // Check if student exists
      const student = await Student.findById(studentId);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      // Update student with Cloudinary URLs
      student.id_card = req.files.id_card[0].path;
      student.id_proof = req.files.id_proof[0].path;
  
      await student.save();
  
      res.status(200).json({
        message: "Documents uploaded successfully",
        data: {
          id_card: student.id_card,
          id_proof: student.id_proof,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Error uploading documents", error });
    }
  };

module.exports = { register, uploadDocuments };
