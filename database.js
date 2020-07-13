const mysql = require('mysql');
const dotenv = require('dotenv');


if (process.env.node_env = 'development') {
dotenv.config({
  path: 'config.env'
});
}

module.exports = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PW,
  database : process.env.DB_NAME
});
