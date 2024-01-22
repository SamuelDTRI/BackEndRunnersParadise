const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Review = sequelize.define(
    "Review",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      userId: {
        type: DataTypes.INTEGER, // Ajusta el tipo de datos según cómo almacenas userId en tu base de datos
        allowNull: false,
      },

      productId: {
        type: DataTypes.STRING, // Ajusta el tipo de datos según cómo almacenas idKey en tu base de datos
        allowNull: false,
      },

      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false, freezeTableName: true }
  );

  return Review;
};