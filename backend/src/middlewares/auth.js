const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');

// middleware to check if user is logged in or not
exports.requireSignIn = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please login to get access.', 401),
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(decoded);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token does not exist.', 401),
    );
  }

  req.user = currentUser;
  next();
});

exports.userMiddleware = catchAsync(async (req, res, next) => {
  if (req.user.role !== 'user') {
    return res.status(400).json({ message: 'Must be a user' });
  }
  next();
});

exports.adminMiddleware = catchAsync(async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(400).json({ message: 'Must be a admin' });
  }
  next();
});
