const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('PaymentResponse', {
    paymentId: {
      type: DataTypes.STRING(),
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    payment_gateway: {
        type: DataTypes.STRING(),
        allowNull: false
    },  
    payment_status: {
        type:DataTypes.STRING(),
        allowNull: false
    },
    });
};