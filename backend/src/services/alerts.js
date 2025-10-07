const { query } = require('../config/db');

// PUBLIC_INTERFACE
async function listAlerts(userId) {
  const { rows } = await query(
    `SELECT id, type, message, read, created_at
     FROM alerts WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId]
  );
  return rows;
}

// PUBLIC_INTERFACE
async function markRead(userId, id) {
  const { rows } = await query(
    `UPDATE alerts SET read = true WHERE user_id = $1 AND id = $2
     RETURNING id, type, message, read, created_at`,
    [userId, id]
  );
  return rows[0] || null;
}

module.exports = {
  listAlerts,
  markRead,
};
