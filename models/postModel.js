const pool = require('../db');

async function createPost(userId, categoryId, title, body, status){
  const result = await pool.query(
    'INSERT INTO posts (user_id, category_id, title, body, status, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *',
    [userId, categoryId, title, body, status]
  );
  return result.rows[0];
}
async function updatePost(id, title, body, status){
  const result = await pool.query(
    'UPDATE posts SET title = $1, body = $2, status = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
    [title, body, status, id]
  );
  return result.rows[0];
}
async function getAllPosts(){
  const result = await pool.query('SELECT * FROM posts WHERE deleted_at IS NULL');
  return result.rows;
}
async function getPostById(id){
  const result = await pool.query('SELECT * FROM posts WHERE id = $1 AND deleted_at IS NULL', [id]);
  return result.rows[0];
}
async function deletePost(id){
  const result = await pool.query(
    'UPDATE posts SET deleted_at = NOW() WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
}
module.exports={
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
