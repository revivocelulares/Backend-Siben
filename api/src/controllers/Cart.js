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

const updateCart = async (info, id) => {
    try {
        console.log(info);
        const updatedCart = await Cart.update({
            cart_items: info
        },
            { where: { ClientEmail: id } 
        });
        return updatedCart;
    } catch (error) {
        console.log(error);
    }
};

const deleteCart = async (id) => {
    try {
        console.log(info);
        const deletedCart = await Cart.destroy(
            { where: { ClientEmial: id } 
        });
    } catch (error) {
        console.log(error);
    }

};

module.exports = {
    getCart,
    updateCart,
    deleteCart
}
