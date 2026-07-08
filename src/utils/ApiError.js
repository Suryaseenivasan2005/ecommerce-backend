'use strict';

/**
 * ApiError — Custom application error class
 *
 * Extends the native Error so controllers and middleware can throw
 * structured errors that carry an HTTP status code.
 *
 * Usage:
 *   const { ApiError } = require('../utils/ApiError');
 *
 *   // Throw from a controller (works with asyncHandler):
 *   throw new ApiError(404, 'Product not found');
 *   throw new ApiError(400, 'Invalid request body');
 *   throw new ApiError(409, 'Email already exists');
 *
 * The central errorHandler middleware in src/middlewares/errorHandler.js
 * reads the statusCode property and sends the correct HTTP response.
 */
class ApiError extends Error {
  /**
   * @param {number} statusCode  HTTP status code (e.g. 400, 404, 500)
   * @param {string} message     Human-readable error message
   */
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';

    // Maintains proper stack trace in V8 environments (Node.js).
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

module.exports = { ApiError };
