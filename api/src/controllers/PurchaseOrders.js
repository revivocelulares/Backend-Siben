const { PurchaseOrder, Client, Invoice, PaymentResponse } = require('../db');
const sendMail = require('./Mailer.js');

const newOrder = async (orderDetails, ClientEmail, total_usd, total_ars, orderStatus) => {
    try {
        let purchaseOrder = await PurchaseOrder.create({
            orderDetails,
            total_ars,
            total_usd,
            orderStatus
        });
        let resp = await Client.findByPk(ClientEmail);
        console.log(resp);
        purchaseOrder.setClient(resp);
        let email = resp.dataValues.email;
        let orderId = purchaseOrder.dataValues.orderId;

        if (orderStatus === 'Completed') {
            let date = Date.now();
            let newInvoice = await Invoice.create({
                invoice_date: date,
                invoice_detail: orderDetails,
                invoice_ammount: total_ars
            });
            newInvoice.setClient(email);
            newInvoice.setPurchaseOrder(orderId);

            const mail = {
                type: 'confirmOrder',
                email: email,
            };
            sendMail(mail);
        }
        if (orderStatus === 'Processing') {
            const mail = {
                type: "inProcess",
                email: email,
            };
            sendMail(mail);
        }
        return purchaseOrder;

    } catch (e) {
        console.log(e);
    }
};

const updateOrder = async (info, id) => {   
    try {
        const updatedclient = await PurchaseOrder.update(info,
            {
                where: { orderId: parseInt(id) }
            });
        const order = await PurchaseOrder.findByPk(id);
        const client = await Client.findByPk(order.dataValues.ClientEmail);
        const mail = {
            type: 'confirmOrder',
            email: client.dataValues.email,
        };
        sendMail(mail);
        return updatedclient;

    } catch (e) {
        console.log(e);
    }
};

const getAllOrders = async () => {
    try {
        return await PurchaseOrder.findAll({
            include: {
                model: Client,
                attributes: ['name', 'lastname'],
            }
        });
    } catch (e) {
        console.log(e);
    };
};

const getOrdersByStatus = async (status) => {
    try {
        const response = await PurchaseOrder.findAll({
            where: { orderStatus: status },
            include: {
                model: Client,
                attributes: ['name', 'lastname'],
            }
        })
        return response;
    } catch (e) {
        console.log(e);
    }
};
const getOrdersByClientId = async (client) => {   
    try {
        const response = await PurchaseOrder.findAll({
            where: { ClientEmail: client },
            include: {
                model: Client,
                attributes: ['name', 'lastname'],
            }
        })
        return response;
    } catch (e) {
        console.log(e);
    }
};

const getOrderDetails = async (id) => {   
    try {
        const response = await PurchaseOrder.findByPk(id,
            {
                include: {
                    model: Client,
                    attributes: ['email', 'name', 'lastname'],
                }
            });

        return response
    } catch (e) {
        console.log(e);
    }
};

const getOrderWithPayment = async (client) => {
    try{
        const response = await PurchaseOrder.findAll({
            where: { ClientEmail: client },
            include: [{
                model: Client,
                attributes: ['email']
            },
            {
                model: PaymentResponse
            }]
        });

        return response;
    } catch (error) {
        console.log(error);
    }
};

const getOrderWithPaymentById = async (client, orderId) => {
    try {
        const response = await PurchaseOrder.findByPk(orderId, {
            where: { ClientEmail: client },
            include: [{
                model: Client,
                attributes: ['email', 'name', 'lastname']
            },
            {
                model: PaymentResponse
            }]
        });

        return response;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    newOrder,
    updateOrder,
    getAllOrders,
    getOrdersByStatus,
    getOrderDetails,
    getOrdersByClientId,
    getOrderWithPayment,
    getOrderWithPaymentById
}