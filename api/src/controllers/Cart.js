const { Cart } = require('../db');

const getCart = async (info) => {
    try {
        let clientCart = await Cart.findOne({
            where: {
                ClientEmail: info
            }
        });
        return clientCart;
    } catch (error) {
        console.log(error);
    }
};

const updateCart = async (info, ClientEmail) => {
    try {
        const updatedCart = await Cart.update({
            cart_items: info
        },
            { where: { ClientEmail: ClientEmail } 
        });
        return updatedCart;
    } catch (error) {
        console.log(error);
    }
};

const deleteCart = async (info) => {
    try {
        const deletedCart = await Cart.destroy(
            { where: { ClientEmail: info } 
        });
        return deletedCart;
    } catch (error) {
        console.log(error);
    }

};

module.exports = {
    getCart,
    updateCart,
    deleteCart
}
