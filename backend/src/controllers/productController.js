const express = require('express');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const Product = require('../models/productModel');

// create product
exports.createProduct = catchAsync(async (req, res, next) => {
  let { productImages } = req.body;
  // let featuredImage = req.file;
  const createdBy = req.user.id;

  productImages = [];
  // req.files is coming from multer-library file upload
  if (req.files.length > 0) {
    productImages = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  // featuredImage ={}
  // if(req.file.featuredImage){
  //   return
  // }

  const newProduct = await Product.create({
    ...req.body,
    // featuredImage,
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

  res.status(200).json(products);
});

exports.getSingleProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  res.status(200).json(product);
});
