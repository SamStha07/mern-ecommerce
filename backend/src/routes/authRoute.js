const express = require('express');
const { signup, login } = require('../controllers/authController.js');
const { requireSignIn } = require('../middlewares/auth');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
