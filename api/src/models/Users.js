const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('Users', {
      id_user: {
          type: DataTypes.INTEGER(),
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
          unique: true
      },
      user_name: {
          type: DataTypes.STRING(),
          allowNull: false
      },
      user_password: {
        type: DataTypes.STRING(),
        allowNull: false
      },
      rol: {
        type: DataTypes.STRING(),
        allowNull: false
      }
  }, { timestamps: false });
};