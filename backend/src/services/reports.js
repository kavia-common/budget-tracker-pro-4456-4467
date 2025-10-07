const { query } = require('../config/db');

// PUBLIC_INTERFACE
async function monthlySummary(userId, year, month) {
  /**
   * Returns income and expense aggregates for a given month (1-12)
   */
  const { rows } = await query(
    `SELECT
       SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END)::float AS income,
       SUM(CASE WHEN amount < 0 THEN -amount ELSE 0 END)::float AS expense
     FROM transactions
     WHERE user_id = $1
       AND EXTRACT(YEAR FROM date) = $2
       AND EXTRACT(MONTH FROM date) = $3`,
    [userId, year, month]
  );
  const data = rows[0] || { income: 0, expense: 0 };
  return {
    year,
    month,
    income: Number(data.income || 0),
    expense: Number(data.expense || 0),
    net: Number(data.income || 0) - Number(data.expense || 0),
  };
}

// PUBLIC_INTERFACE
async function categoryBreakdown(userId, year, month) {
  const { rows } = await query(
    `SELECT c.id as category_id, c.name as category_name,
            SUM(CASE WHEN t.amount < 0 THEN -t.amount ELSE 0 END)::float AS total_spent
     FROM categories c
     LEFT JOIN transactions t
       ON t.category_id = c.id AND t.user_id = $1
       AND EXTRACT(YEAR FROM t.date) = $2
       AND EXTRACT(MONTH FROM t.date) = $3
     GROUP BY c.id, c.name
     ORDER BY total_spent DESC NULLS LAST`,
    [userId, year, month]
  );
  return rows.map(r => ({
    category_id: r.category_id,
    category_name: r.category_name,
    total_spent: Number(r.total_spent || 0),
  }));
}

module.exports = {
  monthlySummary,
  categoryBreakdown,
};
