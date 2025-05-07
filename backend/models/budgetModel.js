const pool = require("..");

exports.getAllBudgetsByUser = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM budget WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
};

exports.createBudget = async (budget) => {
  const { user_id, category_id, amount, period } = budget;
  const result = await pool.query(
    `INSERT INTO budget (user_id, category_id, amount, period)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [user_id, category_id, amount, period]
  );
  return result.rows[0];
};

exports.deleteBudget = async (budgetId, userId) => {
  await pool.query(
    `DELETE FROM budget WHERE id = $1 AND user_id = $2`,
    [budgetId, userId]
  );
};
