const express = require("express");
const login_router = express.Router();
const loginController = require("../controllers/login_controller");

login_router.route("/login").post(loginController);

module.exports = login_router;