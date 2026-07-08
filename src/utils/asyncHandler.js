'use strict';

/**
 * asyncHandler — Async route wrapper
 *
 * Eliminates the need for try/catch blocks inside every async controller.
 * Wraps an async function so that any rejected promise is forwarded to
 * Express's error handling middleware via next(err).
 *
 * Usage:
 *   const { asyncHandler } = require('../utils/asyncHandler');
 *
 *   router.get('/', asyncHandler(async (req, res) => {
 *     // Any thrown error or rejected promise is caught automatically.
 *     const result = await someAsyncOperation();
 *     res.json({ success: true, data: result });
 *   }));
 *
 * @param {Function} fn  An async Express route handler
 * @returns {Function}   A wrapped handler that forwards errors to next()
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = { asyncHandler };
