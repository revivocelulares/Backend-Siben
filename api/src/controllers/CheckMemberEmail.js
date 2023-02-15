const { dbconn } = require('../configDBsiben');
require('dotenv').config();

const check = {
    checkSibenEmail: async (req, res) => {
        const query = 'SELECT * FROM users';

        try {
            const conn = await dbconn();          

            await conn.query(query, (error, results, fields) =>{
                if(error) {
                    return console.error('Error: ' + error.message);
                }
                console.log(results[0]);
                return res.status(200).json(results[0]);
            });
            await conn.end;
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = check;