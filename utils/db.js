const mysql = require('mysql2')
// Mysql2 because it works for me

// Creating connection in MySql db
const con =  mysql.createConnection({
    host: 'localhost',
    user: 'arm',
    password: 'qwerty',
    database: 'joga_mysql'
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to your joga_mysql database :V");
});


module.exports = con;