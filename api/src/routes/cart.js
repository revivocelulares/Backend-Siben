const { Router } = require('express');
const { updateCart, getCart, deleteCart } = require ('../controllers/cart.js');
const verify_client_token = require('../controllers/verify_client_token.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = Router();

router.put('/:id', verify_client_token, async(req,res)=>{
  console.log(req.token);
  jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
    if(error){
      console.log(error);
      res.status(403).send({message:"Forbidden Access"});
    } else {
      try {
            let { cart_items } = req.body;            
            let { id } = req.params;
            let response = await updateCart(cart_items, id);
            return response ? res.status(200).json(response) : res.status(404);
        } catch(error) {
          console.log(error);
          return res.status(500).json('Error en el servidor')
        }
    }
  })

});

router.get('/:id', verify_client_token, async(req,res)=>{
  jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
    if(error){
      res.status(403).send({message:"Forbidden Access"});
    } else {
      try{
        
        let clientEmail = req.params['ClientEmail'];
        let response = await getCart(clientEmail);
        return response ? res.status(200).json(response) : res.status(404);

        }catch(error){
          console.log(error);
          return res.status(500).json('Error en el servidor')
        }
    }
  })
});

router.delete('/:id', verify_client_token, async(req,res)=>{
  jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
    if(error){
      res.status(403).send({message:"Forbidden Access"});
    } else {
      try{
          let clientEmail = req.params['ClientEmail'];
          let response = await deleteCart(clientEmail);
          return response ? res.status(200).json(response) : res.status(404);

      }catch(error){
          console.log(error);
          return res.status(500).json('Error en el servidor')
      }
    }
  })
});

module.exports = router;