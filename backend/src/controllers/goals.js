const { validationResult, param, body } = require('express-validator');
const goalsService = require('../services/goals');

// PUBLIC_INTERFACE
async function list(req, res) {
  const items = await goalsService.listGoals(req.user.id);
  return res.json({ items });
}

// PUBLIC_INTERFACE
async function create(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const created = await goalsService.createGoal(req.user.id, req.body);
  return res.status(201).json(created);
}

// PUBLIC_INTERFACE
async function update(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const updated = await goalsService.updateGoal(req.user.id, req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: 'Goal not found' });
  return res.json(updated);
}

// PUBLIC_INTERFACE
async function remove(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  await goalsService.deleteGoal(req.user.id, req.params.id);
  return res.status(204).send();
}

const createValidation = [
  body('name').isString().isLength({ min: 1 }),
  body('target_amount').isFloat({ min: 0 }),
  body('current_amount').optional().isFloat({ min: 0 }),
  body('due_date').optional().isISO8601(),
];

const updateValidation = [
  param('id').isUUID(4),
  body('name').optional().isString().isLength({ min: 1 }),
  body('target_amount').optional().isFloat({ min: 0 }),
  body('current_amount').optional().isFloat({ min: 0 }),
  body('due_date').optional().isISO8601(),
];

const idParamValidation = [param('id').isUUID(4).withMessage('id must be a UUID v4')];

module.exports = {
  list,
  create,
  update,
  remove,
  createValidation,
  updateValidation,
  idParamValidation,
};
