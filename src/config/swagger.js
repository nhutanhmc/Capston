// src/config/swagger.js
const swaggerAutogen = require('swagger-autogen')();

const outputFile = './src/config/swagger_output.json';
const endpointsFiles = ['./src/app.js']; // File chứa route chính

const doc = {
    info: {
        title: 'Smart Running Coach API',
        description: 'API Documentation for Smart Running Coach',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    securityDefinitions: {
        BearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
            description: 'JWT Authorization header using the Bearer scheme. Example: Bearer <token>',
        }
    },
    security: [
        {
            BearerAuth: []
        }
    ],
    components: {
        securitySchemes: {
            BearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            }
        }
    }
};

swaggerAutogen(outputFile, endpointsFiles, doc);
