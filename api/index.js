const server = require('./src/app.js');
const { conn } = require('./src/db.js');
require('dotenv').config();

//Syncing all the models at once.
conn.sync({ force: false }).then(() => {
    server.listen(process.env.PORT, () => {
      console.log('server listening on port 3001');
    });
  }, (error) => console.log(error));