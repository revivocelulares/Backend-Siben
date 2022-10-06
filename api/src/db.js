require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = process.env.NODE_ENV === 'production'
    ? new Sequelize({
        database: DB_NAME,
		dialect: 'mysql',
		host: DB_HOST,
		port: 7247,
		username: DB_USER,
		password: DB_PASSWORD,
		pool: {
            max: 3,
			min: 1,
			idle: 10000,    
        },
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
            keepAlive: true,
        },
        ssl: true,
    })
    : new Sequelize(`mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        {
            logging: false, //set to console.log to see the raw SQL queries
            native: false,  
        }
    );

sequelize.authenticate().then(() => {
    console.log('Connection to database has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

const basename = path.basename(__filename);

const modelDefiners = [];
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
});

modelDefiners.forEach(model => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const {
    Users,
    Cart,
    Invoice,
    PurchaseOrder
} = sequelize.models;

//Acá todas las relaciones

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
