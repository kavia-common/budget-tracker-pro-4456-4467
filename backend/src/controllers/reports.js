const { validationResult, query } = require('express-validator');
const reportsService = require('../services/reports');

// PUBLIC_INTERFACE
async function monthly(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const year = parseInt(req.query.year, 10);
  const month = parseInt(req.query.month, 10);
  const summary = await reportsService.monthlySummary(req.user.id, year, month);
  return res.json(summary);
}

// PUBLIC_INTERFACE
async function categories(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const year = parseInt(req.query.year, 10);
  const month = parseInt(req.query.month, 10);
  const data = await reportsService.categoryBreakdown(req.user.id, year, month);
  return res.json({ items: data });
}

const monthlyValidation = [
  query('year').isInt({ min: 1970 }).withMessage('year is required'),
  query('month').isInt({ min: 1, max: 12 }).withMessage('month is required (1-12)'),
];

module.exports = {
  monthly,
  categories,
  monthlyValidation,
};
