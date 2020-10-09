const express = require('express');

const catchAsync = require('../utils/catchAsync');
const Cart = require('../models/cartModel');
const AppError = require('../utils/appError');

// Create cart
exports.addItemToCart = catchAsync(async (req, res, next) => {
  const { price, quantity, productId } = req.body.cartItems;
  //   const userId = req.user.id;

  let cart = await Cart.findOne({ user: req.user.id });

  if (cart) {
    // cart exists for user
    // finds the index where product id meets
    let itemIndex = cart.cartItems.findIndex((p) => p.productId === productId);

    if (itemIndex !== -1) {
      // product exists in the cart, update the quantity
      let productItem = cart.cartItems[itemIndex];
      // console.log(productItem);
      productItem.quantity = quantity;
      cart.cartItems[itemIndex] = productItem;
    } else {
      //product does not exists in cart, add new item
      cart.cartItems.push({ productId, quantity, price });
      // res.status(500).json({ message: 'Error' });
    }
    cart = await cart.save();
    return res.status(201).send(cart);
  } else {
    // no cart for user, create new cart
    const newCart = await Cart.create({
      user: req.user.id,
      ...req.body,
    });
    return res.status(201).json({
      status: 'success',
      data: {
        cart: newCart,
      },
    });
  }
});
