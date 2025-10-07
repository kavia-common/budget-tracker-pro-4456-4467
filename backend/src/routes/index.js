const express = require('express');
const healthController = require('../controllers/health');

const authRoutes = require('./auth');
const accountRoutes = require('./accounts');
const transactionRoutes = require('./transactions');
const budgetRoutes = require('./budgets');
const goalRoutes = require('./goals');
const reportRoutes = require('./reports');
const alertRoutes = require('./alerts');

const router = express.Router();

// Health endpoint
/**
 * @swagger
 * /:
 *   get:
 *     summary: Health endpoint
 *     responses:
 *       200:
 *         description: Service health check passed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: Service is healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 environment:
 *                   type: string
 *                   example: development
 */
router.get('/', healthController.check.bind(healthController));

// API v1 routes
router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/accounts', accountRoutes);
router.use('/api/v1/transactions', transactionRoutes);
router.use('/api/v1/budgets', budgetRoutes);
router.use('/api/v1/goals', goalRoutes);
router.use('/api/v1/reports', reportRoutes);
router.use('/api/v1/alerts', alertRoutes);

module.exports = router;
