const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv');
const cors = require('cors');
const colors = require('colors');

const GlobalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const connectDB = require('./config/db');

const authRoute = require('./routes/authRoute');
const authAdminRoute = require('./routes/admin/authAdminRoute');
const categoryRoute = require('./routes/categoryRoute');
const productRoute = require('./routes/productRoute');
const cartRoute = require('./routes/cartRoute');

// dummy data
const products = require('./products');

const app = express();

// environment variable
env.config();

// mongoose DB
connectDB();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use('/api/users', authRoute);
app.use('/api/admin', authAdminRoute);
app.use('/api/category', categoryRoute);
app.use('/api/product', productRoute);
app.use('/api/user/cart', cartRoute);

// // dummy api
// app.get('/api/products', (req, res) => {
//   res.json(products);
// });
// app.get('/api/products/:id', (req, res) => {
//   const product = products.find((p) => p._id === req.params.id);
//   res.json(product);
// });

// middleware for unknown route to show error for all HTTPHeaders
// Global error handling Middleware
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(GlobalErrorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${port}...`
      .yellow.bold,
  );
});
