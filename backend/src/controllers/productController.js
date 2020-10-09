const express = require('express');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const Product = require('../models/productModel');

// create product
exports.createProduct = catchAsync(async (req, res, next) => {
  // res.status(201).json({ files: req.files, body: req.body });
  let { productImages } = req.body;
  const createdBy = req.user.id;

  productImages = [];
  // req.files is coming from multer-library file upload
  if (req.files.length > 0) {
    productImages = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const newProduct = await Product.create({
    ...req.body,
    productImages,
    createdBy,
  });

  //   const product = newProduct.productImages
  res.status(201).json({
    status: 'success',
    product: newProduct,
  });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    status: 'success',
    results: products.length,
    products,
  });
});
