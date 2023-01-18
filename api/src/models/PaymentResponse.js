const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('PaymentResponse', {
    paymentId: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    payment_gateway: {
        type: DataTypes.STRING(),
        allowNull: false
    },  
    payment_status: {
        type:DataTypes.ENUM(),
        values: ['Acredited', 'Aprobed', 'Pending', 'Rejected'],
        allowNull: false
    },
    });
};