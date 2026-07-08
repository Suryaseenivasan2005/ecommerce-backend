'use strict';

require('dotenv').config();

const app = require('./app');
const { testConnection } = require('./config/database');

const PORT = process.env.PORT || 3000;

/**
 * Graceful startup: verify DB connectivity before accepting traffic.
 */
async function startServer() {
  try {
    await testConnection();

    const server = app.listen(PORT, () => {
      console.log(`[server] Running in ${process.env.NODE_ENV || 'development'} mode`);
      console.log(`[server] Listening on http://localhost:${PORT}`);
    });

    // ─── Graceful shutdown ───────────────────────────────────────────────────
    const shutdown = (signal) => {
      console.log(`\n[server] ${signal} received — shutting down gracefully...`);
      server.close(() => {
        console.log('[server] HTTP server closed.');
        process.exit(0);
      });

      // Force exit if graceful close takes too long
      setTimeout(() => {
        console.error('[server] Forced shutdown after timeout.');
        process.exit(1);
      }, 10_000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (err) {
    console.error('[server] Failed to start:', err.message);
    process.exit(1);
  }
}

startServer();
