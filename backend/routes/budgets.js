const express = require("express");
const router = express.Router();
const budgetController = require("../controllers/budgetController");

// Add middleware here later (e.g., requireAuth) to get userId from token
router.get("/", budgetController.getBudgets);
router.post("/", budgetController.addBudget);
router.delete("/:id", budgetController.deleteBudget);

module.exports = router;
