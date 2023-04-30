const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      title: 'dotMOV',
      version: '1.0.0',
      description: 'Documentation for dotMOV movie application'
    },
    basePath: '/api',
  },
  apis: ['./movieserver/.*js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
