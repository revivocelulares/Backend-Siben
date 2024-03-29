const { Router, response } = require('express');
const { newOrder,updateOrder, getAllOrders, getOrdersByStatus, getOrderDetails, getOrdersByClientId, getOrderWithPayment, getOrderWithPaymentById } = require('../controllers/PurchaseOrders');
const router = Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const verify_client_token = require('../controllers/verify_client_token.js');
const verify_admin_token = require('../controllers/verify_admin_token.js');

router.post('/', verify_client_token, async(req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
      if(error) {
        res.status(403).send({message:"Forbidden Access"});
      } else {
        try{
            let{ orderDetails, ClientEmail, total_usd, total_ars, orderStatus } = req.body;
            let response = await newOrder(orderDetails, ClientEmail, total_usd, total_ars, orderStatus);
           return response ? res.status(200).json(response) : res.status(404);
        }catch(e){
            console.log(e);
            return res.status(500).json('Error en el servidor')
        }
      }
    });
});

router.patch('/:id', verify_client_token, async(req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, async(error, authData) => {
      if(error){
        res.status(403).send({message:"Forbidden Access"});
      } else {
        try { 
            let info = req.body;
            let { id } = req.params;
            let response = await updateOrder(info, id);
            return response ? res.status(200).json(response) : res.status(404);
        } catch(e) {
            console.log(e);
            return res.status(500).json('Error en el servidor')
        }
      }
    });
});

router.get("/", verify_admin_token, async (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, async(error, authData) => {
      if(error) {
        res.status(403).send({message:"Forbidden Access"});
      } else {
        try {
            let { status } = req.query;
            let { client } = req.query;
            let response;
            if (status) response = await getOrdersByStatus(status);
            if (client) response = await getOrdersByClientId(client);
            if (!status && !client) response = await getAllOrders();
            
            return response ? res.status(200).json(response) : res.status(404)

        } catch (error) {
            console.log(error);
            return res.status(500).json('Error en el servidor.');
        }
      }
    });
});

router.get("/:id", verify_client_token, async (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
    if(error) {
      res.status(403).send({message:"Forbidden Access"});
    } else {
      try {
          let { id } = req.params;
          let response = await getOrdersByClientId(id);

          return response ? res.status(200).json(response) : res.status(404)

      } catch (error) {
          console.log(error);
          return res.status(500).json('Error en el servidor.');
      }
    }
  });
});

router.get("/orderwithpay/:ClientEmail", verify_admin_token, async (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) =>  {
    if(error) {
      res.status(403).send({message:"Forbidden Access"});
    } else {
      try {
        let { ClientEmail } = req.params;
        let response = await getOrderWithPayment(ClientEmail);
        return response ? res.status(200).json(response) : res.status(404);        
      } catch (error) {
        console.log(error);
        return res.status(500).json('Error en el servidor.');
      }
    }
  });
});

router.get("/uniqueorderwithpay/:ClientEmail/:orderId", verify_admin_token, async (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
    if(error) {
      res.status(403).send({message:"Forbidden Access"});
    } else {
      try {
        let { ClientEmail, orderId } = req.params;
        let response = await getOrderWithPaymentById(ClientEmail, orderId);
        return response ? res.status(200).json(response) : res.status(404);
      } catch (error) {
        console.log(error);
        return res.status(500).json('Error en el servidor.');
      }
    }
  });
});

module.exports = router;