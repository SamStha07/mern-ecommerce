const express = require('express');
const {
  signup,
  login,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require('../controllers/authController.js');
const { requireSignIn, adminMiddleware } = require('../middlewares/auth');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile/:id', requireSignIn, getUserProfile);
router.put('/profile', requireSignIn, updateUserProfile);
router.get('/', requireSignIn, adminMiddleware, getAllUsers);

router
  .route('/:id')
  .delete(requireSignIn, adminMiddleware, deleteUser)
  .get(requireSignIn, adminMiddleware, getUserById)
  .put(requireSignIn, adminMiddleware, updateUser);

module.exports = router;
