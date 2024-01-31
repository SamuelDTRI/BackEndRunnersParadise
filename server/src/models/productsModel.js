const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },

      brand: {
        type: DataTypes.ENUM('ADIDAS', 'NIKE', 'NEWBALANCE'),
        allowNull: false,
      },

      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },

      colors: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },

      size: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL),
        allowNull: false,
      },
      
      image: {
        type: DataTypes.JSONB, 
        allowNull: false,
      },
    },
    { timestamps: false, freezeTableName: true }
  );
};