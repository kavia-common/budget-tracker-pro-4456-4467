const express = require('express');
const auth = require('../middleware/auth');
const controller = require('../controllers/alerts');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Alerts
 *   description: User alerts and notifications
 */

router.use(auth);

/**
 * @swagger
 * /api/v1/alerts:
 *   get:
 *     summary: List alerts
 *     tags: [Alerts]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: List of alerts }
 */
router.get('/', controller.list);

/**
 * @swagger
 * /api/v1/alerts/{id}/read:
 *   post:
 *     summary: Mark alert as read
 *     tags: [Alerts]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: integer }
 *         required: true
 *     responses:
 *       200: { description: Marked as read }
 *       404: { description: Not found }
 */
router.post('/:id/read', controller.idParamValidation, controller.markRead);

module.exports = router;
