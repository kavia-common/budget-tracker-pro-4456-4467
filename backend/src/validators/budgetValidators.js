const { body, param } = require('express-validator');

module.exports = {
  createBudgetValidation: [
    body('category_id').isInt().withMessage('category_id is required'),
    body('amount').isFloat({ min: 0 }).withMessage('amount must be >= 0'),
    body('period').isIn(['monthly', 'quarterly', 'yearly']).withMessage('Invalid period'),
  ],
  updateBudgetValidation: [
    param('id').isInt().withMessage('id must be an integer'),
    body('category_id').optional().isInt(),
    body('amount').optional().isFloat({ min: 0 }),
    body('period').optional().isIn(['monthly', 'quarterly', 'yearly']),
    body('active').optional().isBoolean(),
  ],
};
