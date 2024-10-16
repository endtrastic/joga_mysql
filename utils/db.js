const mysql = require('mysql2')
// Mysql2 because it works for me

const db =  mysql.createConnection({
    host: 'localhost',
    user: 'arm',
    password: 'qwerty',
    database: 'joga_mysql'
});

module.exports = db;