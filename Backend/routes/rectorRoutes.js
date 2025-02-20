const express = require("express");
const upload = require("../middlewares/upload");
const { signupRector } = require("../controllers/rectorController");
const { getUserByEmail } = require("../controllers/getUserByEmail_controller");
const router = express.Router();

router.post("/signup", upload.single("idProof"), signupRector);
router.get("/getByEmail", getUserByEmail);
module.exports = router;
