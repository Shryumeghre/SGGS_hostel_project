const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const leaveForm_controller = require("../controllers/leaveForm_controller");
const leaveForm_router = express.Router();

leaveForm_router.post("/submit",authMiddleware, leaveForm_controller.leaveForm);
leaveForm_router.get("/approveByHOD/:formId", leaveForm_controller.approveByHOD);
leaveForm_router.get("/approveByRector/:formId", leaveForm_controller.approveByRector);
leaveForm_router.get("/reject/:formId/:role", leaveForm_controller.rejectForm);
leaveForm_router.get("/", leaveForm_controller.getAllLeaveForms);//for All forms
leaveForm_router.get("/statuses/:formId",authMiddleware, leaveForm_controller.getLeaveStatus);//for status of selected fprm
leaveForm_router.get("/leaveforms/:userId",authMiddleware, leaveForm_controller.getAllFormsOfUser);//for All forms of user
leaveForm_router.get("/leaveform/:formId",authMiddleware, leaveForm_controller.getLeaveForm);//for single form details 


module.exports = leaveForm_router;