'use strict';

const { Pool } = require('pg');

/**
 * PostgreSQL connection pool.
 *
 * All configuration is pulled from environment variables so that no
 * credentials are ever hard-coded. Copy .env.example → .env and fill
 * in your real values before starting the server.
 *
 * Pool settings can be tuned via the optional DB_POOL_* env vars.
 */
const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  // Maximum number of clients the pool should contain.
  max: parseInt(process.env.DB_POOL_MAX, 10) || 10,

  // How long a client is allowed to remain idle before being closed (ms).
  idleTimeoutMillis: parseInt(process.env.DB_POOL_IDLE_TIMEOUT, 10) || 30_000,

  // How long to wait when acquiring a client before throwing an error (ms).
  connectionTimeoutMillis: parseInt(process.env.DB_POOL_CONNECTION_TIMEOUT, 10) || 2_000,
});

// Surface pool-level errors so they don't crash the process silently.
pool.on('error', (err) => {
  console.error('[database] Unexpected pool error:', err.message);
});

/**
 * Sends a lightweight query to verify that the database is reachable.
 * Called once at server startup — fails fast if credentials are wrong.
 *
 * @returns {Promise<void>}
 */
async function testConnection() {
  const client = await pool.connect();
  try {
    await client.query('SELECT 1');
    console.log('[database] Connection established successfully.');
  } finally {
    client.release();
  }
}

module.exports = { pool, testConnection };
