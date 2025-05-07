const accountModel = require('../models/accountModel');

// Get all accounts for a user
const getAccounts = async (req, res) => {
  try {
    const userId = req.query.user_id; // or req.body.user_id for POST
    if (!userId) return res.status(400).json({ error: 'Missing user_id' });

    const accounts = await accountModel.getAccountsByUserId(userId);
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch accounts' });
  }
};

// Add new account
const createAccount = async (req, res) => {
  try {
    const { user_id, name, balance, type } = req.body;
    if (!user_id || !name || balance == null || !type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newAccount = await accountModel.addAccount(user_id, name, balance, type);
    res.status(201).json(newAccount);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add account' });
  }
};

// Delete account
const removeAccount = async (req, res) => {
  try {
    const { user_id } = req.query;
    const { id } = req.params;
    if (!user_id || !id) return res.status(400).json({ error: 'Missing user_id or id' });

    const deleted = await accountModel.deleteAccount(id, user_id);
    if (!deleted) {
      return res.status(404).json({ error: 'Account not found or unauthorized' });
    }

    res.json({ message: 'Account deleted', deleted });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete account' });
  }
};

module.exports = {
  getAccounts,
  createAccount,
  removeAccount,
};
