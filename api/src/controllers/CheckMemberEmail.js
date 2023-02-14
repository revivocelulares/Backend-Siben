const { dbconn } = require('../configDBsiben');
require('dotenv').config();

const check = {
    checkSibenEmail: async (req, res) => {
        const query = 'SELECT * FROM users WHERE group_id=3 AND active=1';

        try {
            const conn = await dbconn();          

            conn.query(query, (error, results, fields) =>{
                if(error) {
                    return console.error('Error: ' + error.message);
                }
                console.log(results[0]);
                return res.status(200).json(results[0]);
            });
            conn.end;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = check;