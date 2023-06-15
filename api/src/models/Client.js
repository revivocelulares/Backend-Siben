const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Client', {
    email: {
      type: DataTypes.STRING(),
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    login_password: {
      type: DataTypes.STRING(),
      allowNull: false,
      unique: false,
    },
    name: {
      type: DataTypes.STRING(),
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING(),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(),
      allowNull: false
    },
    isMember: {
      type: DataTypes.ENUM(),
      values: ["Si", "No"],
      allowNull: true
    },
    isRegistered: {
        type: DataTypes.BOOLEAN(),
        allowNull: true
    },
    isVerified: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
      defaultValue: false
    },
    token: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: "algo"
    },
    profession: {
        type: DataTypes.ENUM(),
        values: ["Médico", "Enfermero", "Otra Disciplina"],
        allowNull: false
    },
    resident: {
        type: DataTypes.ENUM(),
        values: ["Si", "No"],
        allowNull: false
    }
  }, { timestamps: false });
};
