const express = require('express');
const router = express.Router();
const {
  getRecurringPayments,
  addRecurringPayment,
  deleteRecurringPayment,
} = require('../controllers/recurringController');

// GET all recurring payments for a user
router.get('/:userId', getRecurringPayments);

// POST a new recurring payment
router.post('/', addRecurringPayment);

// DELETE a recurring payment
router.delete('/:id', deleteRecurringPayment);

module.exports = router;
