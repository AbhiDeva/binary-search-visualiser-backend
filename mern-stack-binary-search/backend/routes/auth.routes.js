import express from 'express';
import { registeruser, loginUser, getCurrentUser } from '../controller/authController.js';
import checkAuth from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registeruser);
router.post('/login', loginUser);
router.get('/user', checkAuth, getCurrentUser);

export default router;
