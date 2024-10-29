const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

async function login(req, res) {
  const{ username, password } = req.body;
  try {
    const user=await userModel.findUserByUsername(username);
    if (!user){
      return res.status(400).json({ message:'not found'});
    }
    if(password !== user.password) {
      return res.status(400).json({ message:'Invalid password'});
    }
    const token = jwt.sign(
      {id: user.id, username: user.username, role: user.role},
      process.env.JWT_SECRET,
      {expiresIn: '1h'}
    );
    res.json({message: 'Logged in successfully', token});
  } catch (error){
    console.error("Error in login:", error);
    res.status(500).json({message: 'Server error'});
  }
}
module.exports = {
  login,
};
