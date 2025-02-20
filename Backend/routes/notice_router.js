const express = require("express");
const notice_router = express.Router();
const noticeController = require("../controllers/noticeboard_controller");

notice_router.post("/Add", noticeController.AddNotice);
notice_router.get("/All", noticeController.getNotice);
notice_router.delete("/:id", noticeController.deleteNotice);



module.exports = notice_router;