const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Budget Tracker Pro API',
      version: '1.0.0',
      description: 'REST API for managing accounts, transactions, budgets, goals, reports, and alerts.',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token in the format: Bearer <token>',
        },
      },
    },
    security: [{ bearerAuth: [] }],
    tags: [
      { name: 'Auth', description: 'Authentication endpoints' },
      { name: 'Accounts', description: 'Manage user accounts' },
      { name: 'Transactions', description: 'Manage transactions' },
      { name: 'Budgets', description: 'Manage budgets' },
      { name: 'Goals', description: 'Manage savings goals' },
      { name: 'Reports', description: 'Reports and analytics' },
      { name: 'Alerts', description: 'User alerts and notifications' },
    ],
    servers: [
      { url: 'http://localhost:3000' },
    ],
  },
  apis: [
    './src/routes/*.js',
  ],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
