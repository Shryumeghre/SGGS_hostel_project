const express = require("express");
const { authMiddleware, verifyRectorOrWarden } = require("../middlewares/authMiddleware");
const { markAttendance, getAttendance, markAbsentForLateStudents, getMonthlyAttendance} = require("../controllers/attendence_controller");

const attendance_router = express.Router();

// ✅ Student marks attendance (only from college Wi-Fi with registered MAC)
attendance_router.post("/mark", authMiddleware, markAttendance);


// ✅ View monthly attendance (for students)
attendance_router.get("/monthly", authMiddleware, getMonthlyAttendance);

// ✅ Rector/Warden view a student's attendance
attendance_router.get("/student/:studentId", authMiddleware, verifyRectorOrWarden, getAttendance);

// ✅ Manually trigger marking absentees (for testing or manual action by rector/warden)
attendance_router.post("/mark-absent", authMiddleware, verifyRectorOrWarden, markAbsentForLateStudents);

module.exports = attendance_router;