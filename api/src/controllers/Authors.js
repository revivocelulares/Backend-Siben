const jwt = require('jsonwebtoken');
const { Authors, Product } = require('../db.js');

const authors = {
    addAuthor: async (req, res) => {
        jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
            if(error) {
                res.status(403).send({message:"Forbidden Access"});
            } else {
                try {
                    let { name } = req.body;
                    let newAuthor = await Authors.create({
                        name: name
                    });
                    res.status(200).json({newAuthor, message:"Authorized Access", authData});
                } catch (error) {
                    console.log('Error: ' + error);
                }
            }
        });
    },
    getAuthors: async (req, res) => {
        try {
            const getAuthors = await Authors.findAll();
            res.status(200).json(getAuthors);
        } catch (error) {
            console.log('Error: ' + error);
        }
    },
    getbyBook: async (req, res) => {
        try {
            const autor = req.params['name'];
            let founded = await Authors.findAll({
                where: { name: autor },
                include: [{
                    model: Product,
                    through: {
                        attributes: []
                    }
                }] 
            });
            res.status(200).json(founded);
        } catch (error) {
            console.log('Error: ' + error);
        }
    }
};

module.exports = authors;