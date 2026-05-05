const express = require('express');
const router = express.Router();
const {
  submitStandup,
  getMyStandups,
  getTodayStandups,
  getTeamStandups,
} = require('../controllers/standupController');
const { protect, managerOnly } = require('../middleware/authMiddleware');

// Employee routes
router.post('/', protect, submitStandup);
router.get('/me', protect, getMyStandups);

// Manager only routes
router.get('/today', protect, managerOnly, getTodayStandups);
router.get('/team', protect, managerOnly, getTeamStandups);

module.exports = router;