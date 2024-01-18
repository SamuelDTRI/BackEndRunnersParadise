require("dotenv").config();
const { DB_DEPLOY } = process.env;
const productsModel = require("./models/productsModel");
const reviewsModel = require("./models/reviewsModel");
const usersModel = require("./models/usersModel");
const { Sequelize } = require("sequelize");

console.log(`Database Deployed URL: ${DB_DEPLOY}`);

const sequelize = new Sequelize(DB_DEPLOY, {
  dialect: "postgres",
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // self-signed certificates. :)
    },
  },
  logging: false, // Here we are disabling the printing of log messages (in the console).
  native: false, // Here we are choosing not to use the native driver (we have the JavaScript one).
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
