const { Invoice, PurchaseOrder, Client } = require('../db.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const invoice = {
  getAllInvoices: async (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
      if(error){
        res.status(403).send({message:"Forbidden Access"});
      } else {
        try {
          const getinvoice = await Invoice.findAll();
          res.status(200).json(getinvoice);
        } catch (error) {
          console.log(error);
        }
      }
    })
  },
  getInvoicebyID: async (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
      if(error){
        res.status(403).send({message:"Forbidden Access"});
      } else {
        try {
          const { ClientEmail } = req.params;
          const getinvoiceID = await Invoice.findAll({
            where: {ClientEmail: ClientEmail},
            include: [{
              model: PurchaseOrder
            },
            {
              model: Client
            }]
          });
          res.status(200).json(getinvoiceID);
        } catch (error) {
          console.log(error);
        }
      }
    })
  }
}

module.exports = invoice;