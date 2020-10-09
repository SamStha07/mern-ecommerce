const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv');
const cors = require('cors');

const GlobalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const authRoute = require('./routes/authRoute');
const authAdminRoute = require('./routes/admin/authAdminRoute');
const categoryRoute = require('./routes/categoryRoute');
const productRoute = require('./routes/productRoute');
const cartRoute = require('./routes/cartRoute');

const app = express();

// environment variable
env.config();

// mongoose DB
const db = process.env.MONGO_URI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Database connected...');
  })
  .catch((err) => {
    console.log('Mongoose disconnected');
  });
mongoose.set('useFindAndModify', false);

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use('/api/users', authRoute);
app.use('/api/admin', authAdminRoute);
app.use('/api/category', categoryRoute);
app.use('/api/product', productRoute);
app.use('/api/user/cart', cartRoute);

// middleware for unknown route to show error for all HTTPHeaders
// Global error handling Middleware
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(GlobalErrorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
