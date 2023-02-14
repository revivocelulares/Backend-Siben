const mysql = require('mysql2');
require('dotenv').config();
const { SIBEN_DB_USER, SIBEN_DB_PASSWORD, SIBEN_DB_HOST, SIBEN_DB_NAME } = process.env;

const check = {
    checkSibenEmail: (req, res) => {
        let conn = mysql.createConnection({
            host: SIBEN_DB_HOST,
            user: SIBEN_DB_USER,
            password: SIBEN_DB_PASSWORD,
            database: SIBEN_DB_NAME
        });

        let query = 'SELECT * FROM users WHERE group_id=3 AND active=1';

        conn.connect((error) => {
            if (error){
                return console.log('Error: ' + error.message);
            }
            console.log('Conectado a la DB de SIBEN');
        });

        conn.query(query, (error, results, fields) =>{
            if(error) {
                return console.error('Error: ' + error.message);
            }
            console.log(results[0]);
            return res.status(200).json(results[0]);
        });
        conn.end;
    }
}

module.exports = check;