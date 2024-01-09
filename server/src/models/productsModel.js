const { DataTypes } = require('sequelize');

const Product = sequelize.define('Product', { 
    name: {
        type: DataTypes.STRING,
        unique:true,
        allowNull: false,
      },
      id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey: true,
      },
      price:{
        type:DataTypes.NUMBER,
        allowNull:false
      },
      colors:{
        type:DataTypes.STRING,
        allowNull:false
      },
      size:{
        type:DataTypes.NUMBER,
        allowNull:false
      },
      image:{
        public_id: STRING,
        secure_url:STRING,
      },
 });



