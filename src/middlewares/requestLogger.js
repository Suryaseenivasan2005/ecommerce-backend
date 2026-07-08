'use strict';

/**
 * Request Logger Middleware
 *
 * Logs the HTTP method, URL, status code, and response time for every
 * request. Replace or extend this with a proper logger library (e.g.
 * morgan, winston) when you need structured / file-based logging.
 *
 * Usage (in app.js):
 *   const { requestLogger } = require('./middlewares/requestLogger');
 *   app.use(requestLogger);
 *
 * @param {import('express').Request}      req
 * @param {import('express').Response}     res
 * @param {import('express').NextFunction} next
 */
const requestLogger = (req, res, next) => {
  const start = Date.now();

  // Hook into the 'finish' event so we can log the final status code.
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} — ${res.statusCode} (${duration}ms)`
    );
  });

  next();
};

module.exports = { requestLogger };
