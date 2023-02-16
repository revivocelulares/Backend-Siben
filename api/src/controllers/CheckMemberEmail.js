const mysql = require('mysql2/promise')
require('dotenv').config();
const { SIBEN_DB_USER, SIBEN_DB_PASSWORD, SIBEN_DB_HOST, SIBEN_DB_NAME } = process.env;

const check = {
    checkSibenEmail: async (email) => {
        //const Clientemail = req.params["email"];
        mysql.createConnection({
            host: SIBEN_DB_HOST,
            user: SIBEN_DB_USER,
            password: SIBEN_DB_PASSWORD,
            database: SIBEN_DB_NAME })
        .then(conn => conn.query(`SELECT * FROM users WHERE email=? AND group_id=3 AND active=1`, [email]))
        .then(([rows, fields]) => {
            console.log(rows.length);
            return rows.length > 0 ? rows[0].email : null; 
                    // ? res.status(200).json(rows[0].email) 
                    // : res.status(404).json({ mensaje: 'Email no encontrado' });    
                }
            )
        .catch(error => console.log(error));
    }
}

module.exports = check;