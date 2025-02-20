const Rector = require("../models/Rector");
const Student = require("../models/students_model");

const getUserByEmail = async (req, res) => {
  const { email } = req.query; // Email is passed as a query parameter

  try {
    let user = await Rector.findOne({ email });
    if (user) {
      return res.status(200).json({ role: user.role, user });
    }
    user = await Student.findOne({ email });
    if (user) {
      return res.status(200).json({ role: user.role, user });
    }
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

module.exports = { getUserByEmail };
