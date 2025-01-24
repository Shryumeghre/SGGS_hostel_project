const express = require("express");
const upload = require("../middlewares/upload");
const { signupRector } = require("../controllers/rectorController");
const router = express.Router();

router.post("/signup", upload.single("idProof"), signupRector);

module.exports = router;