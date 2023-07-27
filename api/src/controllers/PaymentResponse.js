const { PurchaseOrder, PaymentResponse } = require('../db.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const paymentResponse = {
    createPR: async (req, res) => {
        jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
            if(error){
              res.status(403).send({message:"Forbidden Access"});
            } else {
                try {
                    const { paymentId, payment_gateway, payment_status, orderId } = req.body;
                    console.log('BODY  ---  ', req.body);
                    let newPayment = await PaymentResponse.create({
                        paymentId,
                        payment_gateway,
                        payment_status
                    });
                    console.log('Nuevo Pago   ---   ' , newPayment);
                    let order = await PurchaseOrder.findOne({
                        where: {orderId: orderId}
                    });
                    console.log('ORDEN ID  -  ', orderId);
                    order.setPaymentResponse(paymentId);

                    res.status(200).json({newPayment, message:"Authorized Access", authData});
                } catch (err) {
                    console.log(error);
                }
            }
        });
    },
    listar_todas_respuestas: async (req, res) => {
        jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
            if(error){
              res.status(403).send({message:"Forbidden Access"});
            } else {
                try {
                    let response = await PaymentResponse.findAll({
                        include: {
                            model: PurchaseOrder
                        }
                    });
                    res.status(200).json({response, message:"Authorized Access", authData});

                } catch (err) {
                    console.log(error);
                }
            }
        });
    }

}

module.exports = paymentResponse;