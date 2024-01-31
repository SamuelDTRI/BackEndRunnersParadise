require("dotenv").config();
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, NODE_ENV } = process.env;
const productsModel = require("./models/productsModel");
const reviewsModel = require("./models/reviewsModel");
const usersModel = require("./models/usersModel");
const cartModel = require("./models/cartModel"); 
const cartItemsModel = require("./models/cartItemsModel");
const recordModel = require ("./models/recordModel")
const { Sequelize } = require("sequelize");

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: "railway",
        username: "postgres",
        password: "23G3eaB52CD3F5ED3GFA2d54Ae1C33Cc",
        host: "viaduct.proxy.rlwy.net",
        port: 48986,
        dialect: "postgres",
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        logging: false,
        native: false,
      })
    : 
    new Sequelize(
      console.log("hola")
        // `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        // {
        //   logging: false,
        //   native: false,
        // }
      );

productsModel(sequelize);
reviewsModel(sequelize);
usersModel(sequelize);
cartModel(sequelize); 
cartItemsModel(sequelize); 
recordModel(sequelize)

const { Review, Product, User, Cart, CartItem, Record } = sequelize.models; 

Product.hasMany(Review, { foreignKey: "productId", as: "review" });
Review.belongsTo(Product, { foreignKey: "productId", as: "review" });

User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User, { foreignKey: "userId" });

User.hasOne(Cart, { foreignKey: "userId" }); 
Cart.belongsTo(User, { foreignKey: "userId" }); 

Cart.hasMany(CartItem, { foreignKey: "cartId" }); 
CartItem.belongsTo(Cart, { foreignKey: "cartId" }); 

Product.hasMany(CartItem, { foreignKey: "productId" }); 
CartItem.belongsTo(Product, { foreignKey: "productId" }); 

// User.hasOne(Record, { foreignKey: "userId" }); 
// Record.belongsTo(User, { foreignKey: "userId" }); 

module.exports = { sequelize, Product, Review, User, Cart, CartItem ,Record}; 
