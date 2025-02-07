require('dotenv').config();
const express = require("express");
const nodemailer = require("nodemailer");
const LeaveForm = require("../models/leaveForm_model");
const hodEmails = require("../hodEmails");
const RectorModel = require("../models/Rector");
const axios = require("axios");

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

    // Save leave form to the database
    const leaveForm = new LeaveForm({ ...leaveFormData, recipient, branch });
    await leaveForm.save();

    let recipientEmails = [];
    let approveApiUrl = ""; // To store the correct approval link

    // Determine recipient emails and approval link based on recipient type
    if (recipient === "HOD") {
      const hodEmail = hodEmails[branch]; // Get HOD email based on branch
      if (!hodEmail) {
        return res.status(400).json({ message: "HOD email not found for branch" });
      }
      recipientEmails.push(hodEmail);
      approveApiUrl = `http://localhost:5001/api/approveByHOD/${leaveForm._id}`;
    } else if (recipient === "Rector-Warden") {
      const users = await RectorModel.find({ role: { $in: ["rector", "warden"] } });
      const emails = users.map((user) => user.email);
      recipientEmails = recipientEmails.concat(emails);
      approveApiUrl = `http://localhost:5001/api/approveByRector/${leaveForm._id}`;
    } else {
      return res.status(400).json({ message: "Invalid recipient" });
    }

    if (recipientEmails.length === 0) {
      return res.status(400).json({ message: "No recipient emails found" });
    }

    // Prepare email content with correct approval link
    const emailSubject = "Leave Form Request";
    const emailBody = `
      <h3>Leave Form Request</h3>
      <p><strong>Name:</strong> ${leaveFormData.name}</p>
      <p><strong>Room Number:</strong> ${leaveFormData.roomNum}</p>
      <p><strong>Branch:</strong> ${branch}</p>
      <p><strong>Reason for Leave:</strong> ${leaveFormData.reasonOfLeave}</p>
      <p><strong>Departure Date & Time:</strong> ${leaveFormData.departure.date}, ${leaveFormData.departure.time}</p>
      <p><strong>Arrival Date & Time:</strong> ${leaveFormData.arrival.date}, ${leaveFormData.arrival.time}</p>
      <br />
      <p>Please review the request and take an action:</p>
      <a href="${approveApiUrl}">Accept</a> |
      <a href="http://localhost:3000/reject/${leaveForm._id}?role=${recipient}">Reject as ${recipient}</a>

    `;

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL,
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

const approveByHOD = async (req, res) => {
  try {
    const { formId } = req.params; // Form ID from URL
    const leaveForm = await LeaveForm.findById(formId);

    if (!leaveForm) {
      return res.status(404).json({ message: "Leave form not found" });
    }

    if (leaveForm.recipient !== "HOD") {
      return res.status(400).json({ message: "Form is not assigned to HOD" });
    }

    // Check if HOD email exists for the branch
    const hodEmail = hodEmails[leaveForm.branch];
    if (!hodEmail) {
      return res.status(400).json({ message: `HOD email not found for branch: ${leaveForm.branch}` });
    }

    // Update the leave form status
    leaveForm.status = "accepted by HOD";
    await leaveForm.save();

    // Fetch Rector emails
    const rectors = await RectorModel.find({ role: "rector" }).select("email");
    const rectorEmails = rectors.map((rector) => rector.email);

    // Fetch Warden emails
    const wardens = await RectorModel.find({ role: "warden" }).select("email");
    const wardenEmails = wardens.map((warden) => warden.email);

    const recipientEmails = [...rectorEmails, ...wardenEmails];

    if (recipientEmails.length === 0) {
      return res.status(400).json({ message: "No Rector or warden emails found" });
    }

    // Send email to Rectors
    const emailSubject = "Leave Form Request: Approved by HOD";
    const emailBody = `
      <h3>Leave Form Request</h3>
      <p>The following leave form has been approved by the HOD and requires your review:</p>
      <p><strong>Name:</strong> ${leaveForm.name}</p>
      <p><strong>Room Number:</strong> ${leaveForm.roomNum}</p>
      <p><strong>Branch:</strong> ${leaveForm.branch}</p>
      <p><strong>Reason for Leave:</strong> ${leaveForm.reasonOfLeave}</p>
      <p><strong>Status:</strong> ${leaveForm.status}</p>
      <br />
      <p>Please take an action:</p>
      <a href="http://localhost:5001/api/approveByRector/${leaveForm._id}">Accept</a> |
      <a href="http://localhost:3000/reject/${leaveForm._id}?role=Rector-Warden">Reject</a>
    `;
    await transporter.sendMail({
      from: process.env.EMAIL, // Ensure you have Email set in your environment variables
      to: rectorEmails,
      subject: emailSubject,
      html: emailBody,
    });

    res.status(200).json({ message: "Leave form approved by HOD and notification sent to Rectors" });
  } catch (error) {
    console.error("Error in HOD approval:", error);
    res.status(500).json({ message: "Error in HOD approval", error });
  }
};

const approveByRector = async (req, res) => {
  try {
    const { formId } = req.params; // Form ID from URL
    const leaveForm = await LeaveForm.findById(formId);

    if (!leaveForm) {
      return res.status(404).json({ message: "Leave form not found" });
    }

    // Update the status
    leaveForm.status = "leave granted";
    await leaveForm.save();

    const emailSubject = "Leave From Request: Approved";
    const emailBody = `
      <h3>Leave Form Status</h3>
      <p>Dear ${leaveForm.name},</p>
      <p>Your leave request has been approved by the Rector. Here are the details:</p>
      <p><strong>Branch:</strong> ${leaveForm.branch}</p>
      <p><strong>Reason for Leave:</strong> ${leaveForm.reasonOfLeave}</p>
      <p><strong>Status:</strong> ${leaveForm.status}</p>
      <br />
      <p>Enjoy your leave!</p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL, // Ensure you have EMAIL set in your environment variables
      to: leaveForm.email,
      subject: emailSubject,
      html: emailBody,
    });

    // Send SMS to Parent
    const smsResponse = await axios.post("https://textbelt.com/text", {
      phone: leaveForm.parentsNum, // Ensure parentsNum is valid
      message: `Dear Parent, your ward ${leaveForm.name}'s leave request has been approved by the Rector. Reason: ${leaveForm.reasonOfLeave}.`,
      key: "textbelt", // Free key for single daily SMS
    });

    if (smsResponse.data.success) {
      console.log("SMS sent successfully:", smsResponse.data);
    } else {
      console.error("Failed to send SMS:", smsResponse.data.error);
    }
    
    res.status(200).json({ message: "Leave form approved by Rector" });
  } catch (error) {
    console.error("Error in Rector approval:", error);
    res.status(500).json({ message: "Error in Rector approval", error });
  }
};

const rejectForm = async (req, res) => {
  try {
    const { formId } = req.params;
    const { role } = req.body; // Get role from request body

    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    const leaveForm = await LeaveForm.findById(formId);

    if (!leaveForm) {
      return res.status(404).json({ message: "Leave form not found" });
    }

    // ✅ If HOD already approved, and Rector-Warden rejects, update status to rejected by Rector-Warden
    if (leaveForm.status === "accepted by HOD" && (role === "Rector" || role === "Warden")) {
      leaveForm.status = "Rejected by Rector-Warden";
    } 
    // ✅ If it's a normal rejection case
    else if (leaveForm.recipient === "HOD" || leaveForm.recipient === "Rector-Warden") {
      leaveForm.status = `Rejected by ${role}`;
    } else {
      return res.status(400).json({ message: "Invalid rejection request" });
    }

    await leaveForm.save();

    // Send email notification
    const emailSubject = "Leave Request: Rejected";
    const emailBody = `
      <h3>Leave Form Status</h3>
      <p>Dear ${leaveForm.name},</p>
      <p>Your leave request has been rejected by ${role}. Details:</p>
      <p><strong>Branch:</strong> ${leaveForm.branch}</p>
      <p><strong>Reason:</strong> ${leaveForm.reasonOfLeave}</p>
      <p><strong>Status:</strong> ${leaveForm.status}</p>
      <br/>
      <p>Contact your HOD or Rector for more details.</p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: leaveForm.email,
      subject: emailSubject,
      html: emailBody,
    });

    res.status(200).json({ message: `Leave form rejected by ${role}` });
  } catch (error) {
    console.error("Error in rejecting form:", error);
    res.status(500).json({ message: "Error in rejecting form", error: error.message});
  }
};




module.exports = { leaveForm, approveByHOD, approveByRector, rejectForm };


