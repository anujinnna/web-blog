const pool = require('../db');

async function findUserByUsername(username){
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  return result.rows[0];
}
async function createUser(username, role, password){
  const result = await pool.query(
    `INSERT INTO users (username, role, password) VALUES ($1, $2, $3) RETURNING *`,
    [username, role, password]
  );
  return result.rows[0];
}
module.exports={
  findUserByUsername,
  createUser,
};
