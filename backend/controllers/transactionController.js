const {
    fetchTransactionsByUser,
    insertTransaction,
    removeTransaction,
  } = require('../models/transactionModel');
  
  const getAllTransactions = async (req, res) => {
    const { userId } = req.query;
  
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }
  
    try {
      const transactions = await fetchTransactionsByUser(userId);
      res.status(200).json(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ message: "Failed to retrieve transactions." });
    }
  };
  
  const addTransaction = async (req, res) => {
    const { user_id, date, description, amount, category_id, account_id } = req.body;
  
    if (!user_id || !date || !description || !amount || !category_id || !account_id) {
      return res.status(400).json({ message: "All fields are required." });
    }
  
    try {
      const newTransaction = await insertTransaction({
        user_id,
        date,
        description,
        amount,
        category_id,
        account_id,
      });
      res.status(201).json({
        message: "Transaction added successfully.",
        transaction: newTransaction,
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
      res.status(500).json({ message: "Failed to add transaction." });
    }
  };
  
  const deleteTransaction = async (req, res) => {
    const transactionId = req.params.id;
  
    try {
      await removeTransaction(transactionId);
      res.status(200).json({ message: "Transaction deleted successfully." });
    } catch (error) {
      console.error("Error deleting transaction:", error);
      res.status(500).json({ message: "Failed to delete transaction." });
    }
  };
  
  module.exports = {
    getAllTransactions,
    addTransaction,
    deleteTransaction,
  };
  