const pool = require('../index');

async function findUserByEmail(email) {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0];
}

async function createUser({ name, email, passwordHash, preferredCurrency }) {
    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash, preferred_currency)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, preferred_currency`,
      [name, email, passwordHash, preferredCurrency]
    );
    return result.rows[0]; // return created user (without password)
  }

module.exports = {
  findUserByEmail,
  createUser,
};
