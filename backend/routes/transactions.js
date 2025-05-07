const express = require('express');
const router = express.Router();
const {
  getAllTransactions,
  addTransaction,
  deleteTransaction,
} = require('../controllers/transactionController');

// GET /api/transactions?userId=123
router.get('/', getAllTransactions);

// POST /api/transactions
router.post('/', addTransaction);

// DELETE /api/transactions/:id
router.delete('/:id', deleteTransaction);

module.exports = router;
