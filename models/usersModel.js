const pool = require('../config/db');

const createUser = async (email, password, role, language) => {
    const query = `INSERT INTO usuarios (email, password, role, language) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [email, password, role, language];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

const getUserByEmail = async (email) => {
    const query = `SELECT * FROM usuarios WHERE email = $1`;
    const { rows } = await pool.query(query, [email]);
    return rows[0];
};

module.exports = { createUser, getUserByEmail };