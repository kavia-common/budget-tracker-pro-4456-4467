const { query } = require('../config/db');

// PUBLIC_INTERFACE
async function listGoals(userId) {
  const { rows } = await query(
    `SELECT id, name, target_amount, current_amount, target_date
     FROM goals WHERE user_id = $1 ORDER BY name`,
    [userId]
  );
  return rows;
}

// PUBLIC_INTERFACE
async function createGoal(userId, payload) {
  const { rows } = await query(
    `INSERT INTO goals (user_id, name, target_amount, current_amount, target_date)
     VALUES ($1, $2, $3, COALESCE($4, 0), $5)
     RETURNING id, name, target_amount, current_amount, target_date`,
    [userId, payload.name, payload.target_amount, payload.current_amount || 0, payload.due_date || null]
  );
  return rows[0];
}

// PUBLIC_INTERFACE
async function updateGoal(userId, id, payload) {
  const fields = [];
  const values = [];
  let idx = 1;

  if (payload.name !== undefined) { fields.push(`name = $${idx++}`); values.push(payload.name); }
  if (payload.target_amount !== undefined) { fields.push(`target_amount = $${idx++}`); values.push(payload.target_amount); }
  if (payload.current_amount !== undefined) { fields.push(`current_amount = $${idx++}`); values.push(payload.current_amount); }
  if (payload.due_date !== undefined) { fields.push(`target_date = $${idx++}`); values.push(payload.due_date); }

  if (!fields.length) return null;

  values.push(userId, id);
  const { rows } = await query(
    `UPDATE goals SET ${fields.join(', ')} WHERE user_id = $${idx++} AND id = $${idx}
     RETURNING id, name, target_amount, current_amount, target_date`,
    values
  );
  return rows[0] || null;
}

// PUBLIC_INTERFACE
async function deleteGoal(userId, id) {
  await query('DELETE FROM goals WHERE user_id = $1 AND id = $2', [userId, id]);
  return true;
}

module.exports = {
  listGoals,
  createGoal,
  updateGoal,
  deleteGoal,
};
