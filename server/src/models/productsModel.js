const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Product",
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      colors: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Cambie esto a un array de textos o cadenas
        allowNull: false,
      },
      size: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL), // Cambie esto a un array de números decimales
        allowNull: false,
      },
      image: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Cambia esto a un array de texto o cadenas
        allowNull: false,
      },
    },
    { timestamps: false, freezeTableName: true }
  );
};
