const { Product, Authors } = require('../db.js');

const allBooks = {
    traerTodos: async (req, res) => {
        try {
            const toodsBooks = await Product.findAll({
                include: [{
                    model: Authors,
                    through: {
                        attributes: []
                    }
                }]
            });
            console.log(toodsBooks);
            res.status(200).json(toodsBooks);
        } catch (error) {
            console.log('Error: ' + error);
        }
    }
};

module.exports = allBooks;