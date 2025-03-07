const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware'); 
// Get all users
router.get('/', authenticateToken, userController.getAllUsers);

// Get user by ID
router.get('/:id', userController.getUserById);

// Create new user
router.post('/', userController.createUser);

// Update user by ID
router.put('/:id', userController.updateUser);

// Delete user by ID
router.delete('/:id', userController.deleteUser);

// Login
router.post('/login', userController.login);

// Refresh Token
router.post('/refresh-token', userController.refreshToken);

module.exports = router;
