const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Record",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      data_id : {
        type : DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false, freezeTableName: true }
  );
};