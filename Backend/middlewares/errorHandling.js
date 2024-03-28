export const createError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

export const errorHanlder = (err, req, res, next) => {
    err.message = err.message || "Server Error";
    err.statusCode = err.statusCode || 500;

    if (err.name === "CastError") {
        const message = `"Invalid value provided`;
        err = createError(message, 400);
        return next(err);
    }
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = createError(message, 400);
        return next(err);
    }
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, Try again!`;
        err = createError(message, 400);
        return next(err);
    }
    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token is expired, Try again!`;
        err = createError(message, 400);
        return next(err);
    }
    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};

