const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Product', {
        id_product: {
            type: DataTypes.INTEGER(),
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        title: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        authors: {
            type: DataTypes.STRING(),
            allowNull: false
        },
        isbn: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        prolog: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT(),
            allowNull: false,
        },
        price_usd: {
            type: DataTypes.FLOAT(),
            allowNull: false,
        },
        price_ars: {
            type: DataTypes.FLOAT(),
            allowNull: false,
        },
        sdelete: {
            type: DataTypes.BOOLEAN(),
            allowNull: false,
            defaultValue: false
        },
        image: {
            type: DataTypes.STRING(),
            allowNull: false
        },
        format: {
            type: DataTypes.STRING(),
            allowNull: false,
        }
    }, {timestamps: true});
};