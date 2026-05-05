const Standup = require('../models/Standup');
const Blocker = require('../models/Blocker');

// POST /api/standups
const submitStandup = async (req, res) => {
  const { yesterday, today, blockers, hasBlocker } = req.body;

  try {
    // Get today's date in YYYY-MM-DD format
    const today_date = new Date().toISOString().split('T')[0];

    // Check if user already submitted today
    const existing = await Standup.findOne({
      userId: req.user._id,
      date: today_date,
    });

    if (existing) {
      return res.status(400).json({
        message: 'You have already submitted your standup today',
      });
    }

    // Create standup
    const standup = await Standup.create({
      userId: req.user._id,
      yesterday,
      today,
      blockers: blockers || 'None',
      hasBlocker: hasBlocker || false,
      date: today_date,
    });

    // If there's a blocker, create a Blocker record too
    if (hasBlocker && blockers) {
      await Blocker.create({
        userId: req.user._id,
        standupId: standup._id,
        description: blockers,
      });
    }

    res.status(201).json(standup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/standups/me — my standup history
const getMyStandups = async (req, res) => {
  try {
    const standups = await Standup.find({ userId: req.user._id })
      .sort({ createdAt: -1 }); // newest first
    res.json(standups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/standups/today — who submitted today (manager)
const getTodayStandups = async (req, res) => {
  try {
    const today_date = new Date().toISOString().split('T')[0];
    const standups = await Standup.find({ date: today_date })
      .populate('userId', 'name email team role'); // get user details
    res.json(standups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/standups/team — all team standups (manager)
const getTeamStandups = async (req, res) => {
  try {
    const standups = await Standup.find()
      .populate('userId', 'name email team role')
      .sort({ createdAt: -1 });
    res.json(standups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  submitStandup,
  getMyStandups,
  getTodayStandups,
  getTeamStandups,
};