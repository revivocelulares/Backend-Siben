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
        price_usd_nm: {
            type: DataTypes.FLOAT(),
            allowNull: false,
        },
        price_ars_nm: {
            type: DataTypes.FLOAT(),
            allowNull: false,
        },
        price_usd_m: {
            type: DataTypes.FLOAT(),
            allowNull: false,
        },
        price_ars_m: {
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
            type: DataTypes.ENUM(),
            values: ["EPUB", "PDF"],
            allowNull: false,
        },
        ebook_links: {
            type: DataTypes.JSON(),
            allowNull: true
        }
    }, {timestamps: true});
};