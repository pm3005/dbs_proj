const Budget = require("../models/budgetModel");

exports.getBudgets = async (req, res) => {
  try {
    const userId = req.user.id;
    const budgets = await Budget.getAllBudgetsByUser(userId);
    res.json(budgets);
  } catch (error) {
    console.error("Error fetching budgets:", error);
    res.status(500).json({ message: "Failed to fetch budgets" });
  }
};

exports.addBudget = async (req, res) => {
  try {
    const userId = req.user.id;
    const { category_id, amount, period } = req.body;

    const newBudget = await Budget.createBudget({
      user_id: userId,
      category_id,
      amount,
      period,
    });

    res.status(201).json(newBudget);
  } catch (error) {
    console.error("Error adding budget:", error);
    res.status(500).json({ message: "Failed to add budget" });
  }
};

exports.deleteBudget = async (req, res) => {
  try {
    const userId = req.user.id;
    const budgetId = req.params.id;

    await Budget.deleteBudget(budgetId, userId);
    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    console.error("Error deleting budget:", error);
    res.status(500).json({ message: "Failed to delete budget" });
  }
};
