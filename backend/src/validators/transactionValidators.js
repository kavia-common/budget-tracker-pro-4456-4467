const { body, query, param } = require('express-validator');

module.exports = {
  createTransactionValidation: [
    body('account_id').isUUID(4).withMessage('account_id must be a UUID v4'),
    body('amount').isFloat().withMessage('amount must be a number'),
    body('category_id').optional().isInt(),
    body('currency').optional().isString().isLength({ min: 1, max: 10 }),
    body('description').optional().isString(),
    body('metadata').optional(),
    body('date').optional().isISO8601(),
  ],
  updateTransactionValidation: [
    param('id').isUUID(4).withMessage('id must be a UUID v4'),
    body('amount').optional().isFloat(),
    body('category_id').optional().isInt(),
    body('currency').optional().isString().isLength({ min: 1, max: 10 }),
    body('description').optional().isString(),
    body('metadata').optional(),
    body('date').optional().isISO8601(),
  ],
  paginationValidation: [
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
    query('from').optional().isISO8601(),
    query('to').optional().isISO8601(),
    query('account_id').optional().isUUID(4),
    query('category_id').optional().isInt(),
    query('type').optional().isIn(['income', 'expense']),
  ],
};
