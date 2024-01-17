require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_DEPLOY } = process.env;
const productsModel = require("./models/productsModel");
const reviewsModel = require("./models/reviewsModel");
const usersModel = require("./models/usersModel");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(DB_DEPLOY, {
  logging: false,
  native: false,
});

productsModel(sequelize);
reviewsModel(sequelize);
usersModel(sequelize);

const { Review, Product, User } = sequelize.models;

Product.hasMany(Review, { foreignKey: "productId", as: "review" });
Review.belongsTo(Product, { foreignKey: "productId", as: "review" });

User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User, { foreignKey: "userId" });

module.exports = { sequelize, Product, Review, User };
