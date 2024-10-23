import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuarios',
      version: '1.0.0',
      description: 'Documentación de la API de Usuarios',
    },
  },
  apis: ['./src/routes/user.routes.js'],   
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
