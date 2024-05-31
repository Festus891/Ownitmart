const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };

    error.message = err.message;

    // wrong mongoose object  id error
    if (err.name === "CastError") {
      const message = `Resources not found. Invalid: ${err.path} `;
      error = new ErrorHandler(message, 400);
    }

    // Handling mongoose validation error
    if (err.name === "ValidatorError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    // Handling mongoose duplication error
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      error = new ErrorHandler(message, 400);
    }

    // Hnadling wrong Jwt error
    if (err.name === "JsonWebTokenError") {
      const message = "JSON Web Token is Invalid. Try again!!!";
      error = new ErrorHandler(message, 400);
    }

    // Hnadling Jwt error
    if (err.name === "TokenExpiredError") {
      const message = "JSON Web Token is Expired. Try again!!!";
      error = new ErrorHandler(message, 400);
    }
    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
