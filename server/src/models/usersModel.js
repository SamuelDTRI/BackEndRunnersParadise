const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      country : {
        type: DataTypes.STRING,
        allowNull: true
      },

      phone : {
        type: DataTypes.STRING,
        allowNull: true
      },

      address : {
        type: DataTypes.STRING,
        allowNull: true
      },

      profilePicture: {
        type: DataTypes.BLOB,
        allowNull: true,
      },

      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false, 
      },
     

    },
    { timestamps: false, freezeTableName: true }
  );
};
