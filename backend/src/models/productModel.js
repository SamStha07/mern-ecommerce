const mongoose = require('mongoose');
const slugify = require('slugify');

// const User = require('./userModel');
// const Category = require('./categoryModel');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    price: {
      type: Number,
      required: [true, 'Price must be included'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
    },
    description: {
      type: String,
      required: [true, 'A product must have description'],
      trim: true,
    },
    offer: {
      type: Number,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'A product must have category'],
    },
    productImages: [{ img: { type: String } }],
    reviews: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        review: String,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      //   required: true,
    },
    updatedAt: Date,
  },
  { timestamps: true },
);

productSchema.pre('save', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
  });
  next();
});

module.exports = Product = mongoose.model('Product', productSchema);
