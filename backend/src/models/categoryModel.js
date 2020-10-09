const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
      // unique: true,
    },
    slug: {
      type: String,
      // unique: true,
    },
    parentId: {
      type: String,
    },
    // categoryImage: { type: String },
  },
  { timestamps: true },
);

categorySchema.pre('save', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
  });
  next();
});

module.exports = Category = mongoose.model('Category', categorySchema);
