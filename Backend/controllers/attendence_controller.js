const macaddress = require("macaddress");
const studentModel = require("../models/students_model");
const Attendance = require("../models/attendance_model");
const { authMiddleware } = require("../middlewares/authMiddleware");
const cron = require("node-cron");
const ip=require("ip");

// Helper: Check if time is within 7:30 PM - 9:00 PM
// const isWithinAttendanceTime = () => {
//     const now = new Date();
//     const hours = now.getHours();
//     const minutes = now.getMinutes();
//     return (hours === 19 && minutes >= 30) || (hours === 20 && minutes <= 59);
// };


// Helper to extract IPv4 if wrapped in IPv6 (::ffff:...)
const extractIPv4 = (ipAddr) => {
    if (!ipAddr) return "";
    if (ipAddr.includes("::ffff:")) {
        return ipAddr.split("::ffff:")[1];
    }
    return ipAddr;
};

// College Wi-Fi range: 10.70.40.0 to 10.70.47.255 => /21
const isCollegeIP = (ipAddress) => {
    const subnet = ip.cidrSubnet("10.70.40.0/21");
    return subnet.contains(ipAddress);
};

// ✅ Mark Attendance with Wi-Fi range check only
const markAttendance = async (req, res) => {
    try {
        const userId = req.user.userId;
        const student = await studentModel.findById(userId);
        if (!student) return res.status(404).json({ message: "Student not found" });

        // Get IP from request (account for proxy headers)
        const rawIP =
            req.headers["x-forwarded-for"] ||
            req.connection?.remoteAddress ||
            req.socket?.remoteAddress ||
            req.ip;

        const ipAddress = extractIPv4(rawIP);

        if (!ipAddress) {
            return res.status(400).json({ message: "IP address could not be determined" });
        }

        if (!isCollegeIP(ipAddress)) {
            return res.status(403).json({ message: `Not connected to college Wi-Fi. IP: ${ipAddress}` });
        }

        // If in range
        return res.status(200).json({ message: `✅ Connected to college Wi-Fi. IP: ${ipAddress}` });
    } catch (error) {
        console.error("Error checking Wi-Fi connection:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ✅ Mark Attendance (with IP and MAC address check)
// const markAttendance = async (req, res) => {
//     try {
//         const userId = req.user.userId; // Extracted from JWT
//         const student = await studentModel.findById(userId);
//         if (!student) return res.status(404).json({ message: "Student not found" });

//         // Check attendance time window (7:30 PM to 9:00 PM)
//         // if (!isWithinAttendanceTime()) {
//         //     return res.status(403).json({ message: "Attendance only allowed between 7:30 PM - 9:00 PM" });
//         // }

//         // Get current IP and MAC address
//         const ipAddress = req.ip;
//         const currentMAC = await macaddress.one();

//         // Verify IP and MAC address
//         if (!isCollegeIP(ipAddress)) {
//             return res.status(403).json({ message: "Access denied: Not on college Wi-Fi" });
//         }
//         if (!student.macAddresses.includes(currentMAC)) {
//             return res.status(403).json({ message: "Access denied: Unauthorized MAC address" });
//         }

//         // Check if attendance is already marked today
//         const today = new Date().toISOString().split("T")[0];
//         const alreadyMarked = await Attendance.findOne({
//             studentId: student._id,
//             date: { $gte: new Date(today), $lt: new Date(today + "T23:59:59") },
//         });

//         if (alreadyMarked) {
//             return res.status(400).json({ message: "Attendance already marked today." });
//         }

//         // Save attendance record in Attendance model
//         await Attendance.create({
//             studentId: student._id,
//             status: "Present",
//             ipAddress,
//             macAddress: currentMAC,
//         });

//         res.status(200).json({ message: "Attendance marked successfully." });
//     } catch (error) {
//         console.error("Error in marking attendance:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };

// ✅ Automatically mark absent for students who missed attendance (runs at 9:01 PM)
const markAbsentForLateStudents = async () => {
    try {
        const today = new Date().toISOString().split("T")[0];
        const students = await studentModel.find({});

        for (const student of students) {
            const isMarked = await Attendance.findOne({
                studentId: student._id,
                date: { $gte: new Date(today), $lt: new Date(today + "T23:59:59") },
            });

            // If attendance is not marked, add "Absent" record
            if (!isMarked) {
                await Attendance.create({
                    studentId: student._id,
                    status: "Absent",
                    ipAddress: "N/A",
                    macAddress: "N/A",
                });
            }
        }

        console.log("Absent status updated for students who missed attendance.");
    } catch (error) {
        console.error("Error updating absentees:", error);
    }
};

// ✅ Get Attendance for a Specific Student (for rector/warden only)
const getAttendance = async (req, res) => {
    try {
        const { studentId } = req.params;
        const attendanceRecords = await Attendance.find({ studentId }).sort({ date: -1 });

        if (!attendanceRecords.length) {
            return res.status(404).json({ message: "No attendance records found." });
        }

        res.status(200).json({ attendance: attendanceRecords });
    } catch (error) {
        console.error("Error fetching attendance:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ✅ Get monthly attendance for a student
const getMonthlyAttendance = async (req, res) => {
    try {
        const userId = req.user.userId; // Extracted from JWT (student's ID)
        const { month, year } = req.query;

        if (!month || !year) {
            return res.status(400).json({ message: "Month and year are required" });
        }

        // Ensure month and year are valid
        const monthNumber = parseInt(month);
        const yearNumber = parseInt(year);
        if (isNaN(monthNumber) || isNaN(yearNumber) || monthNumber < 1 || monthNumber > 12) {
            return res.status(400).json({ message: "Invalid month or year" });
        }

        // Calculate start and end of the month
        const startDate = new Date(yearNumber, monthNumber - 1, 1);
        const endDate = new Date(yearNumber, monthNumber, 0, 23, 59, 59);

        // Fetch attendance records for the given month
        const attendanceRecords = await Attendance.find({
            studentId: userId,
            date: { $gte: startDate, $lte: endDate },
        });

        res.status(200).json({ attendance: attendanceRecords });
    } catch (error) {
        console.error("Error fetching monthly attendance:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Schedule job to mark absent at 9:01 PM daily
cron.schedule("1 21 * * *", markAbsentForLateStudents);

module.exports = { markAttendance, getAttendance, markAbsentForLateStudents, getMonthlyAttendance };
