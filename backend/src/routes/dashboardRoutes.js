const express = require('express');
const router = express.Router();
const { getDashboard } = require('../controllers/dashboardController');
const { protect, managerOnly } = require('../middleware/authMiddleware');

router.get('/', protect, managerOnly, getDashboard);

module.exports = router;