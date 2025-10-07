const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../config/db');

const DEFAULT_TOKEN_EXPIRY = process.env.TOKEN_EXPIRY || '1h';

async function findUserByEmail(email) {
  const { rows } = await query('SELECT id, email, password_hash, name FROM users WHERE email = $1', [email]);
  return rows[0];
}

async function createUser({ email, password, name }) {
  const passwordHash = await bcrypt.hash(password, 10);
  const { rows } = await query(
    `INSERT INTO users (email, password_hash, name)
     VALUES ($1, $2, $3)
     ON CONFLICT (email) DO NOTHING
     RETURNING id, email, name`,
    [email, passwordHash, name || null]
  );
  return rows[0] || null; // null if conflict occurred
}

function signToken(user) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not configured');
  return jwt.sign(
    { sub: user.id, email: user.email },
    secret,
    { expiresIn: DEFAULT_TOKEN_EXPIRY }
  );
}

// PUBLIC_INTERFACE
async function register({ email, password, name }) {
  /** Registers a new user, returns { user, token } */
  const existing = await findUserByEmail(email);
  if (existing) {
    return { error: 'Email already in use' };
  }
  const user = await createUser({ email, password, name });
  if (!user) {
    return { error: 'Failed to create user' };
  }
  const token = signToken(user);
  return { user, token };
}

// PUBLIC_INTERFACE
async function login({ email, password }) {
  /** Logs in a user, returns { user, token } or error */
  const user = await findUserByEmail(email);
  if (!user) {
    return { error: 'Invalid credentials' };
  }
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return { error: 'Invalid credentials' };
  }
  const { password_hash, ...safeUser } = user;
  const token = signToken(user);
  return { user: safeUser, token };
}

module.exports = {
  register,
  login,
};
