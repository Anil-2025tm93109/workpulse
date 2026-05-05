const User = require('../models/User');
const Standup = require('../models/Standup');
const Blocker = require('../models/Blocker');

// GET /api/dashboard — summary for manager
const getDashboard = async (req, res) => {
  try {
    const today_date = new Date().toISOString().split('T')[0];

    // Get all employees
    const allUsers = await User.find({ role: 'employee' }).select(
      'name email team'
    );

    // Get today's standups
    const todayStandups = await Standup.find({ date: today_date }).populate(
      'userId',
      'name email team'
    );

    // Who submitted today
    const submittedUserIds = todayStandups.map((s) => s.userId._id.toString());

    // Who has NOT submitted today
    const notSubmitted = allUsers.filter(
      (u) => !submittedUserIds.includes(u._id.toString())
    );

    // Open blockers count
    const openBlockersCount = await Blocker.countDocuments({
      status: 'open',
    });

    // Total standups ever
    const totalStandups = await Standup.countDocuments();

    res.json({
      date: today_date,
      totalEmployees: allUsers.length,
      submittedToday: todayStandups.length,
      notSubmittedToday: notSubmitted.length,
      notSubmittedUsers: notSubmitted,
      openBlockers: openBlockersCount,
      totalStandups,
      todayStandups,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboard };