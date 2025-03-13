const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student", // Ensure it references your student model
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now, // Automatically sets to current date
    },
    status: {
        type: String,
        enum: ["Present", "Absent"],
        required: true,
    },
    ipAddress: {
        type: String,
        required: true,
    },
    macAddress: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
