const { body, param } = require('express-validator');

module.exports = {
  createBudgetValidation: [
    body('category_id').isInt().withMessage('category_id is required'),
    body('month').optional().isString().matches(/^\\d{4}-\\d{2}$/).withMessage('month must be YYYY-MM'),
    body('amount').isFloat({ min: 0 }).withMessage('amount must be >= 0'),
    body('period').optional().isIn(['monthly', 'quarterly', 'yearly']).withMessage('Invalid period'),
    body('active').optional().isBoolean(),
  ],
  updateBudgetValidation: [
    param('id').isUUID(4).withMessage('id must be a UUID v4'),
    body('category_id').optional().isInt(),
    body('month').optional().isString().matches(/^\\d{4}-\\d{2}$/).withMessage('month must be YYYY-MM'),
    body('amount').optional().isFloat({ min: 0 }),
    body('period').optional().isIn(['monthly', 'quarterly', 'yearly']),
    body('active').optional().isBoolean(),
  ],
};
