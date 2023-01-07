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
        isbn: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        prolog: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT('long'),
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
            type: DataTypes.TEXT('long'),
            allowNull: true
        },
        format: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        ebook_links: {
            type: DataTypes.JSON(),
            allowNull: true
        }
    }, {timestamps: true});
};