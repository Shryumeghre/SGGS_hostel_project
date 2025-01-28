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
      const rolesToFetch = ["rector", "warden"];
      // const users = await RectorModel.find({ role: { $in: rolesToFetch } }).select("email");
      // console.log(users); // Log to verify the fetched users

      const users = await RectorModel.find({ role: { $in: ["rector", "warden"] } });
      console.log(users); // Log to verify the fetched users


      const emails = users.map((user) => user.email);
      recipientEmails = recipientEmails.concat(emails);
      console.log("Recipient Emails:", recipientEmails);
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
      <a href="http://localhost:5001/api/leave/approveByRector/${leaveForm._id}">Accept</a> |
      <a href="http://localhost:5001/api/leave/rejectByRector/${leaveForm._id}">Reject</a>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL, // Ensure you have EMAIL set in your environment variables
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
    const { formId, role } = req.params; // Form ID and role from URL
    const leaveForm = await LeaveForm.findById(formId);

    if (!leaveForm) {
      return res.status(404).json({ message: "Leave form not found" });
    }

    if (role === "HOD" && leaveForm.recipient === "HOD") {
      leaveForm.status = "rejected";
    } else if (role === "Rector" && leaveForm.status === "accepted by HOD") {
      leaveForm.status = "rejected";
    } else {
      return res.status(400).json({ message: "Invalid rejection request" });
    }

    await leaveForm.save();

    const emailSubject = "Leave form Request: Rejected";
    const emailBody = `
      <h3>Leave Form Status</h3>
      <p>Dear ${leaveForm.name},</p>
      <p>We regret to inform you that your leave request has been rejected by the Rector. Here are the details:</p>
      <p><strong>Branch:</strong> ${leaveForm.branch}</p>
      <p><strong>Reason for Leave:</strong> ${leaveForm.reasonOfLeave}</p>
      <p><strong>Status:</strong> ${leaveForm.status}</p>
      <br />
      <p>Please contact your HOD or Rector for further clarification.</p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL, // Ensure you have EMAIL set in your environment variables
      to: leaveForm.email,
      subject: emailSubject,
      html: emailBody,
    });

    res.status(200).json({ message: `Leave form rejected by ${role}` });
  } catch (error) {
    console.error("Error in rejecting form:", error);
    res.status(500).json({ message: "Error in rejecting form", error });
  }
};

const getAllLeaveForms = async (req, res) => {
  try {
    const leaveForms = await LeaveForm.find();
    res.status(200).json(leaveForms); 
  } catch (error) {
    console.error('Error fetching leave forms:', error);
    res.status(500).json({ error: 'Failed to fetch leave forms' });
  }
};

module.exports = { leaveForm, approveByHOD, approveByRector, rejectForm ,getAllLeaveForms };