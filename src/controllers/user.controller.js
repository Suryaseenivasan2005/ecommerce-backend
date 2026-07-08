'use strict';

const { pool } = require('../config/database');

const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getOne
};
