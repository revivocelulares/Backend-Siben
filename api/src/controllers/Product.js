const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Product, Authors } = require('../db.js');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
let fs = require('fs');

const product = {
    addProduct: async (req, res) => {
        jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
            if(error) {
                res.status(403).send({message:"Forbidden Access"});
            } else {
                try {
                    let { title, isbn, prolog, description, price_usd_nm, price_ars_nm, price_usd_m, price_ars_m, image, format, ebook_links, autores } = req.body;
                    let buff = fs.readFileSync(`./src/tapa-libros/${title}.jpg`);
                    image = buff.toString('base64');
                    let newProduct = await Product.create({
                        title, 
                        isbn, 
                        prolog, 
                        description, 
                        price_usd_nm, 
                        price_ars_nm,
                        price_usd_m, 
                        price_ars_m, 
                        image, 
                        format,
                        ebook_links
                    });
                    Promise.all(autores.map(async author => {
                        const autor_DB = await Authors.findAll({
                            where: { name: author }
                        })
                        newProduct.addAuthors(autor_DB);
                    }))
                    res.status(200).json({newProduct, message:"Authorized Access", authData});
                } catch (error) {
                    console.log('Error: ' + error);
                }
            }
        });
    },
    updateProduct: async (req, res) => {
        jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
            if(error) {
                res.status(403).send({message:"Forbidden Access"});
            } else {
                try {
                    const id = req.params['id_product'];
                    const info = req.body;
                    let updatedProduct = await Product.update(info, {
                        where: { id_product: id }
                    });
                    res.status(200).json({updatedProduct, message:"Authorized Access", authData});
                } catch (error) {
                    console.log('Error: ' + error);
                }
            }
        });
    },
    hard_deleteProduct: async (req, res) => {
        jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
            if(error) {
                res.status(403).send({message:"Forbidden Access"});
            } else {
                try {
                    const id = req.params['id_product'];
                    let deletedProduct = await Product.destroy({
                        where: { id_product: id }
                    });
                    res.status(200).send({deletedProduct, message:"Authorized Access", authData});
                } catch (error) {
                    console.log('Error: ' + error);
                }
            }
        });
    },
    deleteProduct: async (req, res) => {
        jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
            if(error) {
                res.status(403).send({message:"Forbidden Access"});
            } else {
                try {
                    const id = req.params['id_product'];
                    let sdeletedProduct = await Product.update(
                        { sdelete: true }, {
                            where: { id_product: id }
                        }
                    );
                    res.status(200).send({sdeletedProduct, message:"Authorized Access", authData});
                } catch (error) {
                    console.log('Error: ' + error);
                }
            }
        });
    },
    getProductByID: async (req, res) => {
        try {
            const id = req.params['id_product'];
            const getproductid = await Product.findOne({
                where: { id_product: id, sdelete: false },
                include: [{
                    model: Authors,
                    through: {
                        attributes: []
                    }
                }]
            });
            res.status(200).json(getproductid);
        } catch (error) {
            console.log('Error: ' + error);
        }
    },
    getAllProducts: async (req, res) => {
        try {
            const getProducts = await Product.findAll({
                where: { sdelete: false },
                include: [{
                    model: Authors,
                    through: {
                        attributes: []
                    }
                }]
            });
            res.status(200).json(getProducts);
        } catch (error) {
            console.log('Error: ' + error);
        }
    },
    uploadCaratula: async (req, res) => {
        jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
            if(error) {
                res.status(403).send({message:"Forbidden Access"});
            } else {
                try {
                    let upfile = req.files.file;
                    console.log('file: ' + upfile.name);
                    upfile.mv(`./src/tapa-libros/${upfile.name}`, err => {
                        if(err) return res.status(500).send({ message : err });

                        return res.status(200).send({ message : 'File upload', authData });
                    })
                } catch (error) {
                    console.log('Error: ' + error);
                }
            }
        });
    },
    getProductByAuthor: async (req, res) => {
        try {
            const author_name = req.params['name'];
            const bookfounded = await Authors.findAll({
                where: { name: author_name },
                include: [{
                    model: Product,
                    where: {
                        sdelete: false
                    },
                    through: {
                        attributes: []
                    }
                }]
            })
            res.status(200).json(bookfounded);
        } catch (error) {
            console.log('Error: ' + error);
        }
    },
    getbyPrice: async (req, res) => {
        try {
            const type = req.params['type'];
            let data = await Product.findAll({
                where: { sdelete: false },
                include: [{
                    model: Authors,
                    through: {
                        attributes: []
                    }
                }]
            });
            if (type === 'ASC') {
                data.sort(function (a, b) {
                    if (a.price_usd_nm > b.price_usd_nm) {
                        return 1;
                    }
                    if (a.price_usd_nm < b.price_usd_nm) {
                        return -1;
                    }
                    return 0;
                });
                return res.status(200).json(data);
            } else if (type === 'DESC') {
                data.sort(function (a, b) {
                    if (a.price_usd_nm < b.price_usd_nm) {
                        return 1;
                    }
                    if (a.price_usd_nm > b.price_usd_nm) {
                        return -1;
                    }
                    return 0;
                });
                return res.status(200).json(data);
            } else {
                return res.status(200).json(data);
            }
        } catch (error) {
            console.log('Error: ' + error);
        }
    }
};

module.exports = product;