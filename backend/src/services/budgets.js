const { query } = require('../config/db');

// PUBLIC_INTERFACE
async function listBudgets(userId) {
  const { rows } = await query(
    `SELECT b.id, b.category_id, b.amount, b.month, b.period, b.active
     FROM budgets b
     WHERE b.user_id = $1
     ORDER BY b.month NULLS LAST, b.category_id`,
    [userId]
  );
  return rows;
}

// PUBLIC_INTERFACE
async function createBudget(userId, payload) {
  const { rows } = await query(
    `INSERT INTO budgets (user_id, category_id, month, amount, period, active)
     VALUES ($1, $2, $3, $4, $5, COALESCE($6, true))
     RETURNING id, category_id, month, amount, period, active`,
    [userId, payload.category_id, payload.month || null, payload.amount, payload.period || null, payload.active]
  );
  return rows[0];
}

// PUBLIC_INTERFACE
async function updateBudget(userId, id, payload) {
  const fields = [];
  const values = [];
  let idx = 1;

  if (payload.category_id !== undefined) { fields.push(`category_id = $${idx++}`); values.push(payload.category_id); }
  if (payload.amount !== undefined) { fields.push(`amount = $${idx++}`); values.push(payload.amount); }
  if (payload.month !== undefined) { fields.push(`month = $${idx++}`); values.push(payload.month); }
  if (payload.period !== undefined) { fields.push(`period = $${idx++}`); values.push(payload.period); }
  if (payload.active !== undefined) { fields.push(`active = $${idx++}`); values.push(payload.active); }

  if (!fields.length) return null;

  values.push(userId, id);
  const { rows } = await query(
    `UPDATE budgets SET ${fields.join(', ')} WHERE user_id = $${idx++} AND id = $${idx}
     RETURNING id, category_id, month, amount, period, active`,
    values
  );
  return rows[0] || null;
}

// PUBLIC_INTERFACE
async function deleteBudget(userId, id) {
  await query('DELETE FROM budgets WHERE user_id = $1 AND id = $2', [userId, id]);
  return true;
}

module.exports = {
  listBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
};
