const db = require('..');

// Get all recurring payments for a user
async function getRecurringPaymentsByUser(userId) {
  const result = await db.query(`
    SELECT rp.id, rp.description, rp.amount, c.name AS category, rp.frequency, 
           rp.next_due_date, a.name AS account
    FROM recurring_payments rp
    JOIN categories c ON rp.category_id = c.id
    JOIN accounts a ON rp.account_id = a.id
    WHERE rp.user_id = $1
    ORDER BY rp.next_due_date
  `, [userId]);

  return result.rows;
}

// Add a new recurring payment
async function createRecurringPayment(data) {
  const { userId, description, amount, categoryId, frequency, nextDueDate, accountId } = data;

  const result = await db.query(`
    INSERT INTO recurring_payments 
      (user_id, description, amount, category_id, frequency, next_due_date, account_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
  `, [userId, description, amount, categoryId, frequency, nextDueDate, accountId]);

  return result.rows[0];
}

// Delete a recurring payment
async function deleteRecurringPayment(id) {
  await db.query(`DELETE FROM recurring_payments WHERE id = $1`, [id]);
}

module.exports = {
  getRecurringPaymentsByUser,
  createRecurringPayment,
  deleteRecurringPayment
};
