import express from 'express';
import { signup, login, logout, updateProfile, checkAuth } from '../controllers/authController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/signup', signup);
router.post('/signup', signup);

router.get('/login', login);
router.post('/login', login);

router.get('/logout', logout);
router.post('/logout', logout);

router.put('/update-profile', authenticateUser, updateProfile);

router.get('/check', authenticateUser, checkAuth);

export default router;