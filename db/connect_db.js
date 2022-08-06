const mysql = require("mysql2");

const connection = mysql.createPool({
    host:"localhost",
    database:"Impact_Enterprise",
    user:"root",
    password:""
});

module.exports = connection;