const mysql = require('mysql')
const { promisify } = require('util')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'pizzeria',
    multipleStatements: true
});

pool.query = promisify(pool.query);

module.exports = pool;