const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const CartItem = sequelize.define(
    "CartItem",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      size: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },
      colors: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      }
    },
    { timestamps: false, freezeTableName: true }
  );

  return CartItem;
};