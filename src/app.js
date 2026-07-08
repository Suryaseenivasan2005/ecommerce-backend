'use strict';

require('dotenv').config();

const express = require('express');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();

// ─── Built-in Middleware ─────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

// ─── API Routes ──────────────────────────────────────────────────────────────
// const productRoutes = require('./routes/product.routes');
// app.use('/api/v1/products', productRoutes);

const userRoutes = require('./routes/user.routes');
app.use('/api/v1/users', userRoutes);

// ─── 404 & Error Handlers (must be last) ────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;
