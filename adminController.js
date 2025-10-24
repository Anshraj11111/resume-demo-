// backend/controllers/adminController.js
const User = require('../models/user');
const StudentProfile = require('../models/Studentprofile');

const listUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-passwordHash').lean();
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    await User.findByIdAndUpdate(id, updates);
    res.json({ message: 'Updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    await StudentProfile.deleteOne({ userId: id });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const blockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { block } = req.body; // boolean
    await User.findByIdAndUpdate(id, { blocked: !!block });
    res.json({ message: 'Updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const stats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalTPC = await User.countDocuments({ role: 'tpc' });
    const resumesUploaded = await StudentProfile.countDocuments({ resumeUrl: { $ne: '' } });
    res.json({ totalStudents, totalTPC, resumesUploaded });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { listUsers, editUser, deleteUser, blockUser, stats };
