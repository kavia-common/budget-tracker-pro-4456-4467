const { validationResult, body, param } = require('express-validator');
const accountsService = require('../services/accounts');

// PUBLIC_INTERFACE
async function list(req, res) {
  /** Returns accounts for authenticated user */
  const accounts = await accountsService.listAccounts(req.user.id);
  return res.json({ items: accounts });
}

// PUBLIC_INTERFACE
async function create(req, res) {
  /** Creates a new account */
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const account = await accountsService.createAccount(req.user.id, req.body);
  return res.status(201).json(account);
}

// PUBLIC_INTERFACE
async function update(req, res) {
  /** Updates an account by id */
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const updated = await accountsService.updateAccount(req.user.id, req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: 'Account not found' });
  return res.json(updated);
}

// PUBLIC_INTERFACE
async function remove(req, res) {
  /** Deletes an account by id */
  await accountsService.deleteAccount(req.user.id, req.params.id);
  return res.status(204).send();
}

const createValidation = [
  body('name').isString().isLength({ min: 1 }).withMessage('name is required'),
  body('type').optional().isString(),
  body('balance').optional().isFloat(),
];

const updateValidation = [
  param('id').isUUID(4).withMessage('id must be a UUID v4'),
  body('name').optional().isString(),
  body('type').optional().isString(),
  body('balance').optional().isFloat(),
];

module.exports = {
  list,
  create,
  update,
  remove,
  createValidation,
  updateValidation,
};
