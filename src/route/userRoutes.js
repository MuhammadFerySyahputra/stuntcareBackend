const express = require('express');
const userController = require('../controller/user-controller');
const verifyToken = require('../middleware/auth');

const router = express.Router();

router.post('/users/register', userController.registerUser);
router.post('/users/login', userController.loginUser);
router.post('/users/refresh-token', userController.refreshToken);
router.get('/api/users/:id', verifyToken, userController.getUserById);
router.delete('/users/logout', verifyToken, userController.logoutUser);
router.put('/api/users/:id', verifyToken, userController.updateUser);
router.delete('/api/users/:id', verifyToken, userController.deleteUser);

module.exports = router;
