import express from 'express';
import { getUsersForSidebar, getMessages, sendMessage } from '../controllers/messageController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.get('/users', authenticateUser, getUsersForSidebar);
router.get('/:id', authenticateUser, getMessages);
router.post('/send/:id', authenticateUser, sendMessage);

export default router;