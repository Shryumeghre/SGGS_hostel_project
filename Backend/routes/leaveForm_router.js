const express = require("express");
const leaveForm_controller = require("../controllers/leaveForm_controller");
const leaveForm_router = express.Router();

leaveForm_router.route("/LeaveForm").post(leaveForm_controller);

module.exports = leaveForm_router;