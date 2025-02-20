
const Notice = require("../models/notice_model");

const AddNotice= async (req, res) => {
  try {
    const newNotice = new Notice({ title: req.body.title });
    await newNotice.save();
    res.status(201).json(newNotice);
  } catch (err) {
    res.status(500).json({ error: "Failed to post notice" });
  }
};

const getNotice= async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notices" });
  }
};

const deleteNotice=async(req,res)=>{
  try{
    await Notice.findByIdAndDelete(req.params.id);
      res.json({message: "Notice removed successfully" });
  }catch(err){
    res.status(500).json({ error: "Failed to delete notice" });
  }
}
module.exports = { AddNotice, getNotice, deleteNotice};
