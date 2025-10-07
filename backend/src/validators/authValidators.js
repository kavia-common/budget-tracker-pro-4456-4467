const { body } = require('express-validator');

const emailRule = body('email').isEmail().withMessage('Valid email is required');
const passwordRule = body('password')
  .isLength({ min: 6 })
  .withMessage('Password must be at least 6 characters');

const nameOptionalRule = body('name').optional().isString().isLength({ min: 1 }).withMessage('Name must be a non-empty string');

module.exports = {
  registerValidation: [emailRule, passwordRule, nameOptionalRule],
  loginValidation: [emailRule, passwordRule],
};
