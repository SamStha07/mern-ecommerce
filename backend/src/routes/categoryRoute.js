const express = require('express');
const {
  createCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
} = require('../controllers/categoryController');

const { adminMiddleware, requireSignIn } = require('../middlewares/auth');

const router = express.Router();

router.post('/create', requireSignIn, adminMiddleware, createCategory);
router.get('/', getAllCategories);
router.delete('/:id', requireSignIn, adminMiddleware, deleteCategory);
router.patch('/:id', requireSignIn, adminMiddleware, updateCategory);

module.exports = router;
