const express = require("express");
const nodemailer = require("nodemailer");
const LeaveForm = require("../models/leaveForm_model");
const hodEmails = require("../hodEmails");
const RectorModel = require("../models/Rector");
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
  },
});


const leaveForm = async (req, res) => {
  try {
    const { recipient, branch, ...leaveFormData } = req.body;

    // Save leave form to the database, including recipient and branch
    const leaveForm = new LeaveForm({ ...leaveFormData, recipient, branch });
    await leaveForm.save();

    let recipientEmails = [];

    // Determine recipient emails based on the recipient type
    if (recipient === "HOD") {
      const hodEmail = hodEmails[branch]; // Get HOD email based on branch
      if (!hodEmail) {
        return res.status(400).json({ message: "HOD email not found for branch" });
      }
      recipientEmails.push(hodEmail);
    } else if (recipient === "Rector/Warden") {
      const rolesToFetch = ["Rector", "Warden"];
      const users = await RectorModel.find({ role: { $in: rolesToFetch } }).select("email");
      const emails = users.map((user) => user.email);
      recipientEmails = recipientEmails.concat(emails);
    } else {
      return res.status(400).json({ message: "Invalid recipient" });
    }

    if (recipientEmails.length === 0) {
      return res.status(400).json({ message: "No recipient emails found" });
    }

    // Prepare email content
    const emailSubject = "Leave Form Request";
    const emailBody = `
      <h3>Leave Form Request</h3>
      <p><strong>Name:</strong> ${leaveFormData.name}</p>
      <p><strong>Room Number:</strong> ${leaveFormData.roomNum}</p>
      <p><strong>Branch:</strong> ${branch}</p>
      <p><strong>Registration Number:</strong> ${leaveFormData.regNo}</p>
      <p><strong>Phone Number:</strong> ${leaveFormData.phoneNum}</p>
      <p><strong>Reason for Leave:</strong> ${leaveFormData.reasonOfLeave}</p>
      <p><strong>Duration of Leave:</strong> ${leaveFormData.durationOfLeave}</p>
      <p><strong>Departure Date & Time:</strong> ${leaveFormData.departure.date}, ${leaveFormData.departure.time}</p>
      <p><strong>Arrival Date & Time:</strong> ${leaveFormData.arrival.date}, ${leaveFormData.arrival.time}</p>
      <p><strong>Parent's Number:</strong> ${leaveFormData.parentsNum}</p>
      <br />
      <p>Please review the request and take an action:</p>
      <a href="http://localhost:5001/api/leave/approve/${leaveForm._id}">Accept</a> | 
      <a href="http://localhost:5001/api/leave/reject/${leaveForm._id}">Reject</a>
    `;

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL, // Use the email from environment variable
      to: recipientEmails,
      subject: emailSubject,
      html: emailBody,
    });

    res.status(200).json({ message: "Leave form submitted and emails sent" });
  } catch (error) {
    console.error("Error in submitting leave form:", error);
    res.status(500).json({ message: "Error submitting leave form", error });
  }
};

module.exports = leaveForm;