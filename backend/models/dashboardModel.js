const pool = require('..');

async function getSummary(userId) {
    const result = await pool.query(
      `SELECT * FROM get_dashboard_summary($1)`,
      [userId]
    );
  
    return {
      income: parseFloat(result.rows[0].income),
      expense: parseFloat(result.rows[0].expense),
      budget: parseFloat(result.rows[0].budget),
      accounts: parseInt(result.rows[0].accounts),
      total_balance: parseFloat(result.rows[0].total_balance),
    };
  }

// Get last 6 months income vs expense
async function getAreaChartData(userId) {
  const res = await pool.query(`
    SELECT
      TO_CHAR(date, 'Mon') AS month,
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS income,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS expense
    FROM transactions
    WHERE user_id = $1
      AND date > NOW() - interval '6 months'
    GROUP BY month, date_trunc('month', date)
    ORDER BY date_trunc('month', date)
  `, [userId]);

  return res.rows.map(row => ({
    name: row.month,
    Income: parseFloat(row.income),
    Expense: parseFloat(row.expense),
  }));
}

// Get category-wise expense data
async function getPieChartData(userId) {
  const res = await pool.query(`
    SELECT c.name, SUM(t.amount) AS value
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = $1 AND t.type = 'expense'
    GROUP BY c.name
    ORDER BY value DESC
  `, [userId]);

  return res.rows.map(row => ({
    name: row.name,
    value: parseFloat(row.value),
  }));
}

module.exports = {
  getSummary,
  getAreaChartData,
  getPieChartData,
};
