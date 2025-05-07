const express = require('express');
const router = express.Router();
const {
  fetchSummary,
  fetchAreaChart,
  fetchPieChart,
} = require('../controllers/dashboardController');

router.get('/summary/:userId', fetchSummary);
router.get('/area/:userId', fetchAreaChart);
router.get('/pie/:userId', fetchPieChart);

module.exports = router;
