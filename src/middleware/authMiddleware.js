// src/middlewares/authMiddleware.js
const { verifyAccessToken } = require('../utils/jwt');

// Middleware kiểm tra token cho API
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Lấy token sau 'Bearer '

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = verifyAccessToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }

    req.user = decoded; // Lưu thông tin user vào request
    next();
};

// Middleware để thêm Bearer Token cho tất cả các request trong Swagger UI
const swaggerAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        req.headers['Authorization'] = authHeader;
    }
    next();
};

module.exports = {
    authenticateToken,
    swaggerAuthMiddleware,
};
