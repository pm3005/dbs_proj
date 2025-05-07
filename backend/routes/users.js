const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/userController');

router.post('/login', loginUser);
router.post('/signup', registerUser);

module.exports = router;
