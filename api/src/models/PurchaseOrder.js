const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('PurchaseOrder', {
    orderId: {
      type: DataTypes.INTEGER(),
      autoIncrement: true,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    orderStatus: {
      type: DataTypes.ENUM(),
      values: ['Canceled', 'Submited', 'Completed', 'Processing'],
      defaultValue: 'Submited',
      allowNull: false,
    },
    orderDetails: {
      type: DataTypes.JSON(),
      allowNull: false,
    },
    total_usd: {
      type: DataTypes.INTEGER(),
      allowNull: false

    },
    total_ars: {
      type: DataTypes.FLOAT(),
      allowNull: false

    }
  },
  { timestamps: true });
};