const { body, query, param } = require('express-validator');

module.exports = {
  createTransactionValidation: [
    body('account_id').isInt().withMessage('account_id must be an integer'),
    body('amount').isFloat().withMessage('amount must be a number'),
    body('type').isIn(['income', 'expense']).withMessage('type must be income or expense'),
    body('category_id').optional().isInt(),
    body('description').optional().isString(),
    body('date').optional().isISO8601().toDate(),
  ],
  updateTransactionValidation: [
    param('id').isInt().withMessage('id must be an integer'),
    body('amount').optional().isFloat(),
    body('type').optional().isIn(['income', 'expense']),
    body('category_id').optional().isInt(),
    body('description').optional().isString(),
    body('date').optional().isISO8601().toDate(),
  ],
  paginationValidation: [
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
    query('from').optional().isISO8601(),
    query('to').optional().isISO8601(),
    query('account_id').optional().isInt(),
    query('category_id').optional().isInt(),
    query('type').optional().isIn(['income', 'expense']),
  ],
};
