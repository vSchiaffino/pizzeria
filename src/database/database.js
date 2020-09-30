const mysql = require('mysql')
const { promisify } = require('util')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'pizzeria'
});

pool.query = promisify(pool.query);

module.exports = pool;