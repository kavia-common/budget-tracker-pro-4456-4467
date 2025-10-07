const express = require('express');
const auth = require('../middleware/auth');
const controller = require('../controllers/reports');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Reports and analytics
 */

router.use(auth);

/**
 * @swagger
 * /api/v1/reports/monthly:
 *   get:
 *     summary: Monthly summary (income, expense, net)
 *     tags: [Reports]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: year
 *         required: true
 *         schema: { type: integer }
 *       - in: query
 *         name: month
 *         required: true
 *         schema: { type: integer, minimum: 1, maximum: 12 }
 *     responses:
 *       200: { description: Summary }
 */
router.get('/monthly', controller.monthlyValidation, controller.monthly);

/**
 * @swagger
 * /api/v1/reports/categories:
 *   get:
 *     summary: Category breakdown for a month
 *     tags: [Reports]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: year
 *         required: true
 *         schema: { type: integer }
 *       - in: query
 *         name: month
 *         required: true
 *         schema: { type: integer, minimum: 1, maximum: 12 }
 *     responses:
 *       200: { description: Breakdown }
 */
router.get('/categories', controller.monthlyValidation, controller.categories);

module.exports = router;
