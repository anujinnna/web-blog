const express = require('express');
const {login} = require('../controllers/authController');
const {registerUser} = require('../controllers/userController');

const router = express.Router();
router.post('/login', login);
router.post('/register', registerUser);
module.exports = router;
