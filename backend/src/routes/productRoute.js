const express = require('express');
const multer = require('multer');
const path = require('path');
const shortid = require('shortid');

const {
  createProduct,
  getAllProducts,
  getSingleProduct,
} = require('../controllers/productController');
const { adminMiddleware, requireSignIn } = require('../middlewares/auth');

const router = express.Router();

// stores the readable files in uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  '/create',
  requireSignIn,
  adminMiddleware,
  upload.single('featuredImage'),
  upload.array('productImages'),
  createProduct,
);

router.get('/', getAllProducts);
router.get('/:id', getSingleProduct);

module.exports = router;
