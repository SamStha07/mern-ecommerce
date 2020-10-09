const express = require('express');

const catchAsync = require('../utils/catchAsync');
const Category = require('../models/categoryModel');
const AppError = require('../utils/appError');

// recursive function to show all sub-categories names
function newCategory(categories, parentId = null) {
  const categoryList = [];
  let category;

  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      children: newCategory(categories, cate._id),
    });
  }
  return categoryList;
}

// creates categories
exports.createCategory = catchAsync(async (req, res, next) => {
  const categoryObj = await Category.create(req.body);

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  res.status(201).json({
    status: 'success',
    categoryObj,
  });
});

// gets all categories with sub-categories of Electronics < Mobiles < Samsung
exports.getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find();

  if (categories) {
    const categoryList = newCategory(categories); // calls newCategory() recursive function

    res.status(200).json({
      status: 'success',
      results: categories.length,
      categoryList,
    });
  }
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return next(new AppError('No category found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    category,
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    return next(new AppError('No category found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    category,
  });
});
