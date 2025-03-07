// src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const prisma = require('./config/prisma');
const userRoutes = require('./routes/userRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./config/swagger_output.json');
const { swaggerAuthMiddleware, authenticateToken } = require('./middleware/authMiddleware');

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Swagger Documentation với Middleware Auth
app.use('/api-docs', swaggerAuthMiddleware, swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Prisma Exception Handling
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    console.log('Prisma disconnected');
    process.exit(0);
});

module.exports = app;
