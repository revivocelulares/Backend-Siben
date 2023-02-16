const crypto = require('crypto');
const { Client, Cart } = require('../db.js');
const sendMail = require('./Mailer.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SIBEN_DB_USER, SIBEN_DB_PASSWORD, SIBEN_DB_HOST, SIBEN_DB_NAME } = process.env;
const mysql = require('mysql2/promise');

const client = {
    addClient: async (req, res) => {
        try {
            const { email, login_password, name, lastname, country, isMember, profession, resident, ip_address, long, lat } = req.body;
            let token = crypto.createHash('md5').update(Date.now().toString()).digest('hex');

            const conn = await mysql.createConnection({
                host: SIBEN_DB_HOST,
                user: SIBEN_DB_USER,
                password: SIBEN_DB_PASSWORD,
                database: SIBEN_DB_NAME });
            
            const [rows, fields] = await conn.execute(`SELECT * FROM users WHERE email=? AND group_id=3 AND active=1`, [email]);
            const verify_email = rows.length > 0 ? rows[0]?.email : null;
            console.log('Rows Length: ' + rows.length);
            console.log('Verify Email:  ' + verify_email); 

            const createdClient = await Client.findOrCreate({
                where: { email: email },
                defaults: {
                    email,
                    login_password,
                    name,
                    lastname,
                    country,
                    isRegistered: email ? true : false,
                    isMember: verify_email != null ? 'Si' : 'No',
                    profession,
                    resident,
                    ip_address,
                    long,
                    lat,
                    token
                }
            });

            if(!createdClient[1] && email) {
                let update = await Client.update({
                    email: email,
                    login_password: login_password,
                    isRegistered: true
                }, {where: {email: email}})
            };

            if(createdClient[1] && login_password) {
                let info = {
                    type: 'confirmation',
                    email: email,
                    token: createdClient[0].token
                }
                await sendMail(info);
            };

            let isThereCart = await Cart.findOne({
                where: {ClientEmail: email}
            });

            if(email && !isThereCart) {
                let newCart = await Cart.create();
                newCart.setClient(email);
            };

            res.status(200).send(createdClient[1] === true ? "Cliente creado de manera Exitosa!!" : "Ese  cliente ya existe");

        } catch (error) {
            console.log('Error: ' + error);
        }
    },
    verify: async (req, res) => {
        try {
            const token = req.params['token'];
            const client = await Client.findOne({
              where: { token: token }
            });
            if (client) {
              client.isVerified = true;
              client.save();
              res.status(200).send("Cliente verificado de manera exitosa!!");
            }
            else {
              res.status(404).send("Cliente no encontrado");
            }
        } catch (error) {
            console.log('Error: ' + error);
        }
    },
    resetPassword: async (req, res) => {
        const {email} = req.query;
        try {
            const client = await Client.findOne({
                where: {email: email}
            });

            if (client) {
                client.token = crypto.createHash('md5').update(client.token).digest('hex');
                client.save();
                let info = {
                    type: 'reset',
                    email: client.email,
                    token: client.token
                };
                sendMail(info);
                return res.status(200).send("Correo de reseteo enviado");
            } else {
                return res.status(404).send("Cliente no encontrado");        
            };
        } catch (error) {
            console.log('Error: ' + error);
        }
    },
    getClientbyID: async (req, res) => {
        try {
            const id = req.params['email'];
            const getclientid = await Client.findOne({
                where: { email: id }
            });
            res.status(200).json(getclientid).send("Cliente encontrado");
        } catch (error) {
            console.log('Error: ' + error);
        }
    },
    getAllClients: async (req, res) => {
        try {
            const getclients = await Client.findAll();
            res.status(200).json(getclients);
        } catch (error) {
            console.log('Error: ' + error);
        }
    },
    updateClient: async (req, res) => {
        jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
            if(error){
                res.status(403).send({message:"Forbidden Access"});
            } else {
                try {
                    const id = req.params['email'];
                    const info = req.body;
                    const updatedclient = await Client.update(info, {
                        where: { email: id }
                    });
                    res.status(200).json({updatedclient, message:"Authorized Access", authData});
                } catch (error) {
                    console.log('Error: ' + error);
                }
            }
        });
    },
    deleteClient: async (req, res) => {
        jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
            if(error){
                res.status(403).send({message:"Forbidden Access"});
            } else {
                try {
                    const id = req.params['email'];
                    const deletedclient = await Client.destroy({
                        where: { email: id }
                    });
                    res.status(200).send({deletedclient, message:"Authorized Access", authData});        
                } catch (error) {
                    console.log('Error: ' + error);
                }
            }
        });
    },
    getClientByemail_pass: async (req, res) => {
        try {
            const { email, login_password } = req.query;
            if((email === req.query.email && email !== '') && (login_password === req.query.login_password && login_password !== '')) {
                const encontrado = await Client.findOne({
                    where: {
                        email: email,
                        login_password: login_password
                    }
                });
                res.status(200).json(encontrado);
            } else {
                res.json({mensaje: "Cliente no encontrado"});        
            }
        } catch (error) {
            console.log('Error: ' + error);
        }
    }
};

module.exports = client;