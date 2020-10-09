const express = require('express');

const { addItemToCart } = require('../controllers/cartController');
const { userMiddleware, requireSignIn } = require('../middlewares/auth');

const router = express.Router();

router.post('/addtocart', requireSignIn, userMiddleware, addItemToCart);

module.exports = router;
