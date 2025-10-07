const { query } = require('../config/db');

// PUBLIC_INTERFACE
async function listAccounts(userId) {
  /** Returns all accounts for a user */
  const { rows } = await query('SELECT id, name, type, balance FROM accounts WHERE user_id = $1 ORDER BY id', [userId]);
  return rows;
}

// PUBLIC_INTERFACE
async function createAccount(userId, { name, type, balance }) {
  /** Creates an account for a user */
  const { rows } = await query(
    `INSERT INTO accounts (user_id, name, type, balance)
     VALUES ($1, $2, $3, COALESCE($4, 0))
     RETURNING id, name, type, balance`,
    [userId, name, type || null, balance ?? 0]
  );
  return rows[0];
}

// PUBLIC_INTERFACE
async function updateAccount(userId, id, payload) {
  /** Partially updates an account (name, type, balance) restricted to user */
  const fields = [];
  const values = [];
  let idx = 1;

  if (payload.name !== undefined) { fields.push(`name = $${idx++}`); values.push(payload.name); }
  if (payload.type !== undefined) { fields.push(`type = $${idx++}`); values.push(payload.type); }
  if (payload.balance !== undefined) { fields.push(`balance = $${idx++}`); values.push(payload.balance); }

  if (!fields.length) return null;

  values.push(userId, id);
  const { rows } = await query(
    `UPDATE accounts SET ${fields.join(', ')} WHERE user_id = $${idx++} AND id = $${idx} RETURNING id, name, type, balance`,
    values
  );
  return rows[0] || null;
}

// PUBLIC_INTERFACE
async function deleteAccount(userId, id) {
  /** Deletes an account for a user */
  await query('DELETE FROM accounts WHERE user_id = $1 AND id = $2', [userId, id]);
  return true;
}

module.exports = {
  listAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
};
