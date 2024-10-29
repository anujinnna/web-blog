const express = require('express');
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('../controllers/postsController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();
router.post('/', authenticateToken, createPost);
router.get('/', authenticateToken, getAllPosts);
router.get('/:id', authenticateToken, getPostById);
router.put('/:id', authenticateToken, updatePost);
router.delete('/:id', authenticateToken, deletePost);
module.exports = router;
