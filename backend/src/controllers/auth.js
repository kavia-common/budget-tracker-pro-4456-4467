const { validationResult } = require('express-validator');
const authService = require('../services/auth');

// PUBLIC_INTERFACE
async function register(req, res) {
  /** Registers a new user and returns token */
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { email, password, name } = req.body;
    const result = await authService.register({ email, password, name });
    if (result.error) return res.status(400).json({ message: result.error });
    return res.status(201).json(result);
  } catch (e) {
    return res.status(500).json({ message: 'Registration failed' });
  }
}

// PUBLIC_INTERFACE
async function login(req, res) {
  /** Logs in a user and returns token */
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { email, password } = req.body;
    const result = await authService.login({ email, password });
    if (result.error) return res.status(401).json({ message: result.error });
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({ message: 'Login failed' });
  }
}

module.exports = {
  register,
  login,
};
