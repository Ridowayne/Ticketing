const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const xss = require('xss-clean');
const hpp = require('hpp');
const routes = require('./routes/index');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

app.use(mongoSanitize());
app.use(xss());

app.use('/api', routes);
app.all('/*', (req, res) => {
    return res.status(404).json({
        status: 'Not Found',
        message: `can not get ${req.originalUrl} on the server`,
    });
});
module.exports = app;
