const { validationResult, param } = require('express-validator');
const budgetsService = require('../services/budgets');
const { createBudgetValidation, updateBudgetValidation } = require('../validators/budgetValidators');

// PUBLIC_INTERFACE
async function list(req, res) {
  const items = await budgetsService.listBudgets(req.user.id);
  return res.json({ items });
}

// PUBLIC_INTERFACE
async function create(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const created = await budgetsService.createBudget(req.user.id, req.body);
  return res.status(201).json(created);
}

// PUBLIC_INTERFACE
async function update(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const updated = await budgetsService.updateBudget(req.user.id, parseInt(req.params.id, 10), req.body);
  if (!updated) return res.status(404).json({ message: 'Budget not found' });
  return res.json(updated);
}

// PUBLIC_INTERFACE
async function remove(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  await budgetsService.deleteBudget(req.user.id, parseInt(req.params.id, 10));
  return res.status(204).send();
}

const idParamValidation = [param('id').isInt().withMessage('id must be an integer')];

module.exports = {
  list,
  create,
  update,
  remove,
  createBudgetValidation,
  updateBudgetValidation,
  idParamValidation,
};
