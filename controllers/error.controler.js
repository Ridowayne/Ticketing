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
