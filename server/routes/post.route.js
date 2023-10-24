import express from 'express';
import {
  addPost,
  deletePost,
  getAllPosts,
  getOwnPosts,
  updatePost
} from '../controllers/post.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protect, getAllPosts);
router.get('/ownPosts', protect, getOwnPosts);
router.post('/', protect, addPost);

router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

export default router;
