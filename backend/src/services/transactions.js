const { query } = require('../config/db');

// PUBLIC_INTERFACE
async function listTransactions(userId, filters) {
  /**
   * Paginated list of transactions with optional filters.
   * Filters: page, limit, from, to, account_id, category_id, type
   */
  const page = filters.page || 1;
  const limit = filters.limit || 20;
  const offset = (page - 1) * limit;

  const where = ['t.user_id = $1'];
  const params = [userId];
  let idx = 2;

  if (filters.from) { where.push(`t.date >= $${idx++}`); params.push(filters.from); }
  if (filters.to) { where.push(`t.date <= $${idx++}`); params.push(filters.to); }
  if (filters.account_id) { where.push(`t.account_id = $${idx++}`); params.push(filters.account_id); }
  if (filters.category_id) { where.push(`t.category_id = $${idx++}`); params.push(filters.category_id); }
  // If a type filter is provided, emulate using amount sign
  if (filters.type === 'income') { where.push('t.amount > 0'); }
  if (filters.type === 'expense') { where.push('t.amount < 0'); }

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

  const listSql = `
    SELECT t.id, t.account_id, t.category_id, t.amount, t.currency, t.description, t.date, t.metadata
    FROM transactions t
    ${whereSql}
    ORDER BY t.date DESC, t.id DESC
    LIMIT $${idx++} OFFSET $${idx}
  `;
  const countSql = `SELECT COUNT(*)::int AS total FROM transactions t ${whereSql}`;

  const listParams = [...params, limit, offset];
  const countRes = await query(countSql, params);
  const listRes = await query(listSql, listParams);

  return {
    items: listRes.rows,
    page,
    limit,
    total: countRes.rows[0]?.total || 0,
  };
}

// PUBLIC_INTERFACE
async function createTransaction(userId, payload) {
  /** Seed-safe insert using explicit columns */
  const { rows } = await query(
    `INSERT INTO transactions (user_id, account_id, category_id, amount, currency, description, date, metadata)
     VALUES ($1, $2, $3, $4, $5, $6, COALESCE($7, NOW()::date), $8)
     RETURNING id, account_id, category_id, amount, currency, description, date, metadata`,
    [
      userId,
      payload.account_id,
      payload.category_id || null,
      payload.amount,
      payload.currency || null,
      payload.description || null,
      payload.date || null,
      payload.metadata || null,
    ]
  );
  return rows[0];
}

// PUBLIC_INTERFACE
async function updateTransaction(userId, id, payload) {
  /** Patch update only provided fields ensuring user ownership */
  const fields = [];
  const values = [];
  let idx = 1;

  if (payload.account_id !== undefined) { fields.push(`account_id = $${idx++}`); values.push(payload.account_id); }
  if (payload.category_id !== undefined) { fields.push(`category_id = $${idx++}`); values.push(payload.category_id); }
  if (payload.amount !== undefined) { fields.push(`amount = $${idx++}`); values.push(payload.amount); }
  if (payload.currency !== undefined) { fields.push(`currency = $${idx++}`); values.push(payload.currency); }
  if (payload.description !== undefined) { fields.push(`description = $${idx++}`); values.push(payload.description); }
  if (payload.date !== undefined) { fields.push(`date = $${idx++}`); values.push(payload.date); }
  if (payload.metadata !== undefined) { fields.push(`metadata = $${idx++}`); values.push(payload.metadata); }

  if (!fields.length) return null;

  values.push(userId, id);
  const { rows } = await query(
    `UPDATE transactions SET ${fields.join(', ')}
     WHERE user_id = $${idx++} AND id = $${idx}
     RETURNING id, account_id, category_id, amount, currency, description, date, metadata`,
    values
  );
  return rows[0] || null;
}

// PUBLIC_INTERFACE
async function deleteTransaction(userId, id) {
  await query('DELETE FROM transactions WHERE user_id = $1 AND id = $2', [userId, id]);
  return true;
}

module.exports = {
  listTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
