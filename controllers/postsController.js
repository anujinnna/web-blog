const postModel = require('../models/postModel');
const pool = require('../db');

async function createPost(req, res){
  const {categoryId, title, body, status} = req.body;
  const userId = req.user.id;
  try {
    const categoryCheck = await pool.query([categoryId]);
    if(categoryCheck.rows.length === 0) {
      return res.status(400).json({ message: 'Category ID not found' });
    }
    const post = await postModel.createPost(userId, categoryId, title, body, status);
    res.status(201).json({message: 'Post created', post});
  } catch (error){
    console.error("Error:", error);
    res.status(500).json({ message: 'Server error'});
  }
}
async function getAllPosts(req, res){
  try{
    const posts = await postModel.getAllPosts();
    res.json(posts);
  } catch (error){
    console.error("Error retrieving posts:", error);
    res.status(500).json({ message: 'Server error' });
  }
}
async function getPostById(req, res){
  const { id } = req.params;
  try{
    const post = await postModel.getPostById(id);
    if (!post) return res.status(404).json({ message: 'Post not found'});
    res.json(post);
  } catch (error){
    console.error("Error:", error);
    res.status(500).json({ message: 'Server error' });
  }
}
async function updatePost(req, res){
  const {id} = req.params;
  const {title, body, status} = req.body;
  try{
    const post = await postModel.updatePost(id, title, body, status);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({message: 'Post updated', post});
  } catch (error){
    console.error("Error updating post:", error);
    res.status(500).json({ message: 'Server error'});
  }
}
async function deletePost(req, res){
  const { id } = req.params;
  try {
    const post = await postModel.deletePost(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: 'Server error' });
  }
}
module.exports={
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
