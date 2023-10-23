import express from 'express';
import {
  getMe,
  loginUser,
  registerUser
} from '../controllers/user.controller.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', getMe);

export default router;
