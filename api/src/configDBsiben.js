const mysql = require('mysql2/promise');
require('dotenv').config();
const { SIBEN_DB_USER, SIBEN_DB_PASSWORD, SIBEN_DB_HOST, SIBEN_DB_NAME } = process.env;

const dbconn = async () => {
    const conn = mysql.createConnection({
        host: SIBEN_DB_HOST,
        user: SIBEN_DB_USER,
        password: SIBEN_DB_PASSWORD,
        database: SIBEN_DB_NAME
    });

    conn.connect(function(err) {
        if (err) {
            console.error('Error al conectar a la Base de Datos', err.stack);
            return;
        }
        console.log("Conexión a la Base de Datos de SIBEN establecida con Éxito - ID: " + conn.threadId);
    });
    return conn;
}

module.exports = { dbconn };