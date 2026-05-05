const Blocker = require('../models/Blocker');

// GET /api/blockers — get all open blockers (manager)
const getAllBlockers = async (req, res) => {
  try {
    const blockers = await Blocker.find()
      .populate('userId', 'name email team')
      .populate('resolvedBy', 'name email')
      .sort({ createdAt: -1 });
    res.json(blockers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/blockers/open — only open blockers
const getOpenBlockers = async (req, res) => {
  try {
    const blockers = await Blocker.find({ status: 'open' })
      .populate('userId', 'name email team')
      .sort({ createdAt: -1 });
    res.json(blockers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/blockers/me — my own blockers
const getMyBlockers = async (req, res) => {
  try {
    const blockers = await Blocker.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    res.json(blockers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PATCH /api/blockers/:id/resolve — manager resolves a blocker
const resolveBlocker = async (req, res) => {
  try {
    const blocker = await Blocker.findById(req.params.id);

    if (!blocker) {
      return res.status(404).json({ message: 'Blocker not found' });
    }

    if (blocker.status === 'resolved') {
      return res.status(400).json({ message: 'Blocker already resolved' });
    }

    blocker.status = 'resolved';
    blocker.resolvedBy = req.user._id;
    blocker.resolvedAt = new Date();

    await blocker.save();

    res.json({ message: 'Blocker resolved successfully', blocker });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBlockers,
  getOpenBlockers,
  getMyBlockers,
  resolveBlocker,
};