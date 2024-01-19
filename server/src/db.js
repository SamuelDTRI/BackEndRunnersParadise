require("dotenv").config();
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } = process.env;
const productsModel = require("./models/productsModel");
const reviewsModel = require("./models/reviewsModel");
const usersModel = require("./models/usersModel");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false, // Here we are disabling the printing of log messages (in the console).
    native: false, // Here we are choosing not to use the native driver (we have the JavaScript one).
  }
);

productsModel(sequelize);
reviewsModel(sequelize);
usersModel(sequelize);

const { Review, Product, User } = sequelize.models;

Product.hasMany(Review, { foreignKey: "productId", as: "review" });
Review.belongsTo(Product, { foreignKey: "productId", as: "review" });

User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User, { foreignKey: "userId" });

module.exports = { sequelize, Product, Review, User };
