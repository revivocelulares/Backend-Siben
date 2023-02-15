const mysql = require('mysql2/promise')
require('dotenv').config();
const { SIBEN_DB_USER, SIBEN_DB_PASSWORD, SIBEN_DB_HOST, SIBEN_DB_NAME } = process.env;

const check = {
    checkSibenEmail: (req, res) => {
        mysql.createConnection({
            host: SIBEN_DB_HOST,
            user: SIBEN_DB_USER,
            password: SIBEN_DB_PASSWORD,
            database: SIBEN_DB_NAME })
        .then(conn => conn.query('SELECT email FROM users WHERE group_id=3 AND active=1'))
        .then(([rows, fields]) => {
            console.log(rows);
            return res.status(200).json(rows); })
        .catch(error => console.log(error));
    }
}

module.exports = check;