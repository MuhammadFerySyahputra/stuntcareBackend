const ResponseError = require('../error/response-error');

const errorMiddleware = async (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ResponseError) {
    return res.status(err.status).json({
      errors: err.message,
    });
  }
  return res.status(500).json({
    errors: err.message || 'Internal Server Error',
  });
};

module.exports = errorMiddleware;
