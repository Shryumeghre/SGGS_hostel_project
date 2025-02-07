const express = require("express");
const multer = require('multer');
const student_router = express.Router();
const student_controller = require("../controllers/students_controller");
// const upload = require("../helper/multer.config");
const upload = require("../middlewares/multer-middleware");


student_router.post(
  "/register", // Corrected the route string to include "/"
  upload.fields([
    { name: "id_card", maxCount: 1 },
    { name: "id_proof", maxCount: 1 },
    { name: "receipt_hostel", maxCount: 1 }, // New field for hostel fee receipt
    { name: "receipt_mess", maxCount: 1 }   // New field for mess fee receipt
  ]),
  student_controller.register
);

module.exports = student_router;