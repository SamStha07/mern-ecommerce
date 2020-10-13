const express = require('express');
const jwt = require('jsonwebtoken');

const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

// Create new user
exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new AppError('User already exists', 400));
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  // create token of the current user
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );

  res.status(201).json({
    status: 'success',
    token,
    user,
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
    user,
  });
});

// GET User Profile
exports.getUserProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    return next(new AppError('User not found', 404));
  }
});

// UPDATE USER PROFILE
exports.updateUserProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    const token = jwt.sign(
      {
        id: updatedUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token,
    });
  } else {
    return next(new AppError('User not found', 404));
  }
});

// GET All Users
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  console.log(users);
  res.status(200).json(users);
});

// DELETE User
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that Id', 404));
  }

  res.status(204).json(user);
});
