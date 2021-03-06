const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },

    // profilePicture: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);

// to show this virtual we have add objects in line 53
// also this part is not the part of DB
userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// MIDDLEWARES
// DOCUMENT MIDDLEWARE from mongoose: runs before .save() or .create()
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  // Hash the password with cost of 12 which is more CPU intensive and requires more time create hash
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// method
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  // candidatePassword = original password which isnot hashed coming from user
  // userPassword = is hashed
  return await bcrypt.compare(candidatePassword, userPassword); // it returns true or false
};

module.exports = User = mongoose.model('User', userSchema);
