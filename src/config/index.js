'use strict';

/**
 * Application-level configuration.
 *
 * Centralises all env var reads in one place so the rest of the code
 * can import typed config values instead of reading process.env directly.
 *
 * Add new entries here as you grow the project (e.g. JWT_SECRET, SMTP_HOST).
 */
const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,

  db: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
};

module.exports = config;
