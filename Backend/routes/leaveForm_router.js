const express = require("express");
const leaveForm_controller = require("../controllers/leaveForm_controller");
const leaveForm_router = express.Router();

leaveForm_router.post("/submit", leaveForm_controller.leaveForm);
leaveForm_router.get("/approveByHOD/:formId", leaveForm_controller.approveByHOD);
leaveForm_router.get("/approveByRector/:formId", leaveForm_controller.approveByRector);
leaveForm_router.get("/reject/:formId/:role", leaveForm_controller.rejectForm);
leaveForm_router.get("/", leaveForm_controller.getAllLeaveForms);
leaveForm_router.get("/statuses/:id", leaveForm_controller.getLeaveStatus);

module.exports = leaveForm_router;