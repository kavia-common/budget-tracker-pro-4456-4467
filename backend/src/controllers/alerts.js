const { validationResult, param } = require('express-validator');
const alertsService = require('../services/alerts');

// PUBLIC_INTERFACE
async function list(req, res) {
  const items = await alertsService.listAlerts(req.user.id);
  return res.json({ items });
}

// PUBLIC_INTERFACE
async function markRead(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const updated = await alertsService.markRead(req.user.id, req.params.id);
  if (!updated) return res.status(404).json({ message: 'Alert not found' });
  return res.json(updated);
}

const idParamValidation = [param('id').isUUID(4).withMessage('id must be a UUID v4')];

module.exports = {
  list,
  markRead,
  idParamValidation,
};
