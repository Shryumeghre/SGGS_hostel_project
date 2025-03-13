const jwt = require("jsonwebtoken");


const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded; // { userId, email, role }
        next(); // Proceed to the next middleware or route
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({ message: "Invalid token." });
    }
};
// ✅ Middleware to allow only rector/warden
const verifyRectorOrWarden = (req, res, next) => {
    if (req.user.role === "rector" || req.user.role === "warden") {
        next();  // Proceed if role is rector/warden
    } else {
        res.status(403).json({ message: "Access denied. Rector or Warden only." });
    }
};

module.exports = { authMiddleware, verifyRectorOrWarden };
