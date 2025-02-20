const mongoose = require("mongoose");

const leaveFormSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentUser", 
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: false
    },
    roomNum: {
      type: String,
      required: true,
      trim: true,
    },
    branch: {
      type: String,
      required: true,
      enum: [
        "CSE",
        "Chem",
        "Civil",
        "Electrical",
        "Instru",
        "IT",
        "Mech",
        "Textile",
        "Extc",
        "Prod",
      ],
    },
    regNo: {
      type: String,
      trim: true,
      unique: false
    },
    phoneNum: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/, // Validate a 10-digit phone number
    },
    reasonOfLeave: {
      type: String,
      required: true,
      trim: true,
    },
    durationOfLeave: {
      type: String,
      required: true,
      trim: true,
    },
    departure: {
      date: {
        type: Date,
        required: true,
      },
      time: {
        type: String,
        required: true,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/, // Validate time in HH:mm format
      },
    },
    arrival: {
      date: {
        type: Date,
        required: true,
      },
      time: {
        type: String,
        required: true,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/, // Validate time in HH:mm format
      },
    },
    parentsNum: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/, // Validate a 10-digit phone number
    },
    recipient: {
      type: String,
      required: true,
      enum: ["HOD", "Rector-Warden"], // Options for recipient
    },
    status: {
      type: String,
      enum: ["pending", "accepted by HOD", "leave granted", "Rejected by HOD", "Rejected by Rector-Warden"],
      default: "pending",
    },
  },
);

const LeaveForm = mongoose.model("LeaveForm", leaveFormSchema);

module.exports = LeaveForm;
