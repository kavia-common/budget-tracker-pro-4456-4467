const jwt = require('jsonwebtoken');

/**
 * Express middleware to verify JWT Bearer tokens.
 * Reads JWT from Authorization header: "Bearer <token>"
 */
module.exports = function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }
  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Invalid authorization format' });
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.warn('[Auth] JWT_SECRET not set.');
      return res.status(500).json({ message: 'Auth configuration error' });
    }
    const decoded = jwt.verify(token, secret);
    // attach user info to request
    req.user = { id: decoded.sub, email: decoded.email };
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
