const express = require('express');
const jwt = require('jsonwebtoken');

const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

// Create new user
exports.signup = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password,
    username: Math.random().toString(),
  });

  // create token of the current user
  const token = jwt.sign(
    {
      id: newUser._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

// Login user
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // 2) Check if user exists && password is correct
  const user = await User.findOne({
    email,
  }).select('+password');

  // correctPassword is coming from userModel method and returns true or false
  // if(!user || !correct)
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to client
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );

  res.status(200).json({
    status: 'success',
    token,
    data: user,
  });
});
