'use script'

var mysql = require('mysql');
require("dotenv/config")

var connection = mysql.createConnection({
    host     : process.env.HOST,
    user     : process.env.USER,
    password : process.env.PASS,
    database : process.env.DATABASE
});

connection.connect((error) => {
    if(error){
        throw error
    } 
});

module.exports = connection;