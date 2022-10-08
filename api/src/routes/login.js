const jwt = require('jsonwebtoken');
const route = require("express").Router();
const { Client, Users } = require('../db.js');
require('dotenv').config();

route.post('/admin', async (req, res) => {
  try{
    const {user_name, user_password} = req.body;
    const user = await Users.findOne({
      where: {
        user_name: user_name,
        user_password: user_password
      }
    });
    if(!user) {
      res.json({message: "Incorrect login name or password"});
    } else {
      jwt.sign({user}, process.env.SECRET_KEY, (err, token) => {
        res.json({token, user});
      })
    }
  } catch (error) {
        res.json({message: "Incorrect login name or password"});
  }
});

route.post('/', async (req, res) => {
  try{
    const {email, login_password} = req.body;
    const client = await Client.findOne({
      where: {
        email: email,
        login_password: login_password
      }
    });
    if(!client){
      res.json({message: "Incorrect login name or password"});
    } else {
      jwt.sign({client}, process.env.SECRET_KEY, (err, token) => {
        res.json({token, client});
      })
    }
  } catch (error){
    res.json({message: "Incorrect login name or password"})
  }
});
  
module.exports = route;