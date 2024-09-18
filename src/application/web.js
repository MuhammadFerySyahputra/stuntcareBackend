const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const cookieParser = require('cookie-parser');
const apiRoute = require('../route/api');
const userRouter = require('../route/userRoutes');
const adminRouter = require('../route/adminRoutes');
const errorMiddleware = require('../middleware/error-middleware');

const web = express();

web.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        'https://code.jquery.com',
        'https://stackpath.bootstrapcdn.com',
        'https://cdn.jsdelivr.net',
      ],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        'https://stackpath.bootstrapcdn.com',
        'https://cdn.jsdelivr.net',
        'https://cdnjs.cloudflare.com',
      ],
      imgSrc: ["'self'", '*', 'data:'],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  }),
);

web.use(cookieParser());
web.use(cors());
web.use(express.json());

web.set('view engine', 'ejs');
web.set('views', path.join(__dirname, '../views'));

web.use(express.static(path.join(__dirname, '../../public')));
web.use(express.static(path.join(__dirname, '../utils')));
web.use(express.static(path.join(__dirname, '../data')));

web.use(apiRoute);
web.use(userRouter);
web.use(adminRouter);
web.use(errorMiddleware);

module.exports = web;
