const pool = require('../index');

async function fetchTransactionsByUser(userId) {
  const result = await pool.query(
    `SELECT t.id, t.date, t.description, t.amount, c.name as category, a.name as account
       FROM transactions t
       JOIN categories c ON t.category_id = c.id
       JOIN accounts a ON t.account_id = a.id
       WHERE t.user_id = $1
       ORDER BY t.date DESC`,
    [userId]
  );
  return result.rows;
}

async function insertTransaction({ user_id, date, description, amount, category_id, account_id }) {
  const result = await pool.query(
    `INSERT INTO transactions (user_id, date, description, amount, category_id, account_id)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [user_id, date, description, amount, category_id, account_id]
  );
  return result.rows[0];
}

async function removeTransaction(id) {
  await pool.query(
    'DELETE FROM transactions WHERE id = $1',
    [id]
  );
}

module.exports = {
  fetchTransactionsByUser,
  insertTransaction,
  removeTransaction,
};
