const express = require("express");
const auth_router = express.Router();

auth_router.route("/").get((req, res) => {
    res.status(200).send("Welcome to Shryu channel");
})

module.exports = auth_router;