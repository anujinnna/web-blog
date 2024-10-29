const userModel = require('../models/userModel');

async function registerUser(req, res){
  const {username, role, password} = req.body;
  try{
    const existingUser = await userModel.findUserByUsername(username);
    if (existingUser){
      return res.status(400).json({message: 'Username already taken'});
    }
    const validRoles = ['user', 'author', 'admin'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({message: 'Invalid role'});
    }
    const newUser = await userModel.createUser(username, role, password);
    res.status(201).json({
      message: 'User registered',
      user: {id: newUser.id, username: newUser.username, role: newUser.role},
    });
  } catch (error){
    console.error("Error registering user:", error);
    res.status(500).json({ message: 'Server error' });
  }
}
module.exports={
  registerUser,
};
