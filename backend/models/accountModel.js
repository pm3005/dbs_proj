const pool = require('..');

// Get accounts for a user
const getAccountsByUserId = async (userId) => {
  const query = 'SELECT * FROM accounts WHERE user_id = $1';
  const { rows } = await pool.query(query, [userId]);
  return rows;
};

// Add a new account
const addAccount = async (userId, name, balance, type) => {
  const query = `
    INSERT INTO accounts (user_id, account_name, account_balance, account_type)
    VALUES ($1, $2, $3, $4) RETURNING *
  `;
  const { rows } = await pool.query(query, [userId, name, balance, type]);
  return rows[0];
};

// Delete account by ID
const deleteAccount = async (accountId, userId) => {
  const query = 'DELETE FROM accounts WHERE id = $1 AND user_id = $2 RETURNING *';
  const { rows } = await pool.query(query, [accountId, userId]);
  return rows[0];
};

module.exports = {
  getAccountsByUserId,
  addAccount,
  deleteAccount,
};
