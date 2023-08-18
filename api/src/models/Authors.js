const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('Authors', {
      id_author: {
          type: DataTypes.INTEGER(),
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
          unique: true
      },
      name: {
          type: DataTypes.STRING(),
          allowNull: false
      },
      description: {
        type: DataTypes.TEXT('long'),
        allowNull: true
      },
      image: {
        type: DataTypes.STRING(),
        allowNull: true
      }
  }, { timestamps: false });
};