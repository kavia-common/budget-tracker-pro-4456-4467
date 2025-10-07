const { validationResult, param } = require('express-validator');
const txService = require('../services/transactions');
const { paginationValidation, createTransactionValidation, updateTransactionValidation } = require('../validators/transactionValidators');

// PUBLIC_INTERFACE
async function list(req, res) {
  /** Returns paginated transactions with filters */
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const filters = {
    page: req.query.page ? parseInt(req.query.page, 10) : undefined,
    limit: req.query.limit ? parseInt(req.query.limit, 10) : undefined,
    from: req.query.from,
    to: req.query.to,
    account_id: req.query.account_id || undefined,
    category_id: req.query.category_id ? parseInt(req.query.category_id, 10) : undefined,
    type: req.query.type,
  };
  const data = await txService.listTransactions(req.user.id, filters);
  return res.json(data);
}

// PUBLIC_INTERFACE
async function create(req, res) {
  /** Creates a transaction */
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const created = await txService.createTransaction(req.user.id, req.body);
  return res.status(201).json(created);
}

// PUBLIC_INTERFACE
async function update(req, res) {
  /** Updates a transaction by id */
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const updated = await txService.updateTransaction(req.user.id, req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: 'Transaction not found' });
  return res.json(updated);
}

// PUBLIC_INTERFACE
async function remove(req, res) {
  /** Deletes a transaction by id */
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  await txService.deleteTransaction(req.user.id, req.params.id);
  return res.status(204).send();
}

const idParamValidation = [param('id').isUUID(4).withMessage('id must be a UUID v4')];

module.exports = {
  list,
  create,
  update,
  remove,
  paginationValidation,
  createTransactionValidation,
  updateTransactionValidation,
  idParamValidation,
};
