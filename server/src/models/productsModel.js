const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
  sequelize.define(
    "Product",
  
    {
      id: {
        type: DataTypes.STRING, // Cambiado a STRING para almacenar IDs en formato hexadecimal
        primaryKey: true,
        defaultValue: () => {
          // Genera un número hexadecimal aleatorio
          return Math.floor(Math.random() * 0xFFFFFFFFFFFFFFFF).toString(16);
        },
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      brand: {
        type: DataTypes.ENUM("adidas", "nike", "newbalance"),
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      colors: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      size: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      image: {
        type: DataTypes.JSONB, 
        allowNull: false,
      },
    },
    { timestamps: false, freezeTableName: true }
  );
};