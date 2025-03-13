const express = require("express");
const upload = require("../middlewares/upload");
const { signupRector } = require("../controllers/rectorController");
const { getUserByEmail } = require("../controllers/getUserByEmail_controller");
const router = express.Router();
const { updateMAC } = require("../controllers/rectorController");
const { authMiddleware, verifyRectorOrWarden } = require("../middlewares/authMiddleware");

router.post("/signup", upload.single("idProof"), signupRector);
router.get("/getByEmail", getUserByEmail);
// Apply both middlewares (auth + role check)
router.put("/update-mac/:studentId", authMiddleware, verifyRectorOrWarden, updateMAC);

module.exports = router;
