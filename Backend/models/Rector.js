const mongoose = require("mongoose");

const RectorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  idProof: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["rector", "guard","warden"], required: true },
}, { timestamps: true });



module.exports = mongoose.model("Rector", RectorSchema);
