const { Router } = require('express');
const { updateCart, getCart, deleteCart } = require ('../controllers/Cart.js');
const verify_client_token = require('../controllers/verify_client_token.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = Router();

router.put('/:ClientEmail', verify_client_token, async(req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
    if(error){
      console.log(error);
      res.status(403).send({message:"Forbidden Access"});
    } else {
      try {
            let info = req.body;         
            let clientEmail = req.params['ClientEmail'];
            let response = await updateCart(info, clientEmail);
            return response ? res.status(200).json(response) : res.status(404);
        } catch (error) {
          console.log(error);
          return res.status(500).json('Error en el servidor')
        }
    }
  })

});

router.get('/:ClientEmail', verify_client_token, async(req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
    if(error){
      res.status(403).send({message:"Forbidden Access"});
    } else {
      try{
        let clientEmail = req.params['ClientEmail'];
        let response = await getCart(clientEmail);
        return response ? res.status(200).json(response) : res.status(404);

        } catch (error) {
          console.log(error);
          return res.status(500).json('Error en el servidor')
        }
    }
  })
});

router.delete('/:ClientEmail', verify_client_token, async(req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
    if(error){
      res.status(403).send({message:"Forbidden Access"});
    } else {
      try{
        let clientEmail = req.params['ClientEmail'];
          let response = await deleteCart(clientEmail);
          return response ? res.status(200).json(response) : res.status(404);

      } catch (error) {
          console.log(error);
          return res.status(500).json('Error en el servidor')
      }
    }
  })
});

module.exports = router;