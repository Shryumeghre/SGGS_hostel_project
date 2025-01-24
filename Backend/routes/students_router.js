const express = require("express");
const student_router = express.Router();
const student_controller = require("../controllers/students_controller");
const upload = require("../helper/multer.config")

student_router.route("/register").post(student_controller.register);
student_router.route("/upload").post(
    upload.fields([
      { name: "id_card", maxCount: 1 },
      { name: "id_proof", maxCount: 1 },
    ]),
    student_controller.uploadDocuments // Call the controller function
  );
module.exports = student_router;