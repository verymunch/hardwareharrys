const mysql = require("mysql2");

// create a connection pool
const pool = mysql.createPool({
    host: '45.55.136.114',
    user: 'F2023_mcherry03',
    database: 'F2023_mcherry03',
    password: "hawkeagle23!"
});

module.exports = pool.promise();