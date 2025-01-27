const mongoose = require("mongoose");

const leaveFormSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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
      required: true,
      unique: true,
      trim: true,
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
      enum: ["HOD", "Rector/Warden"], // Options for recipient
    },
  },
  { timestamps: true } // Add createdAt and updatedAt timestamps
);

const LeaveForm = mongoose.model("LeaveForm", leaveFormSchema);

module.exports = LeaveForm;
