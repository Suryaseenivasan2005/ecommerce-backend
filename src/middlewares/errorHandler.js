'use strict';

/**
 * 404 — Resource Not Found
 *
 * Catches any request that didn't match a registered route and forwards
 * a structured error to the central error handler below.
 *
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found — ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

/**
 * Central Error Handler
 *
 * Must be registered LAST in the middleware chain (after all routes).
 * Reads an optional `statusCode` property from the error object so
 * individual controllers / middlewares can set meaningful HTTP codes.
 *
 * In production the stack trace is omitted from the response body.
 *
 * @param {Error & { statusCode?: number }} err
 * @param {import('express').Request}       req
 * @param {import('express').Response}      res
 * @param {import('express').NextFunction}  next  // must be declared even if unused
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  // Always log the full error server-side.
  console.error(`[error] ${statusCode} — ${err.message}`);
  if (!isProduction) {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    // Only expose stack traces outside of production.
    ...(isProduction ? {} : { stack: err.stack }),
  });
};

module.exports = { notFound, errorHandler };
