const express = require('express');
const router = express.Router();
const {
  getAllBlockers,
  getOpenBlockers,
  getMyBlockers,
  resolveBlocker,
} = require('../controllers/blockerController');
const { protect, managerOnly } = require('../middleware/authMiddleware');

// Employee routes
router.get('/me', protect, getMyBlockers);

// Manager only routes
router.get('/', protect, managerOnly, getAllBlockers);
router.get('/open', protect, managerOnly, getOpenBlockers);
router.patch('/:id/resolve', protect, managerOnly, resolveBlocker);

module.exports = router;