const AppError = require('../utils/appError');

const handleCastError = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
};

const handleDuplicateError = (err) => {
    const value = err.errmsg.match(/(["'])(?:\\.|[^\\])*?\1/[0]);
    // const value = err.errmsg.match(/(["'])(?:\\.|[^\\])*?\1/[0]);

    console.log(value);
    const message = `Duplicate field value: ${value}. Please use another value instead`;
    return new AppError(message, 400);
};
const handleValidationError = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data  ${errors.join('. ')}`;
    return new AppError(message, 400);
};

const sendErrrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack,
    });
};

const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        res.status(500).json({
            status: 'fail',
            error: err.code,
            message: 'something went wrong!',
        });
    }
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };
        if (error.name === 'castError') error = handleCastError(error);
        if (error.code === 11000) error = handleDuplicateError(error);
        if (error.name === 'validationError')
            error = handleValidationError(error);

        sendErrorProd(error, res);
    }
};
