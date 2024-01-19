require("dotenv").config();
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } = process.env;
const productsModel = require("./models/productsModel");
const reviewsModel = require("./models/reviewsModel");
const usersModel = require("./models/usersModel");
const { Sequelize } = require("sequelize");

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: "railway",
        username: "postgres", 
        password:
          "23G3eaB52CD3F5ED3GFA2d54Ae1C33Cc",
        host: "viaduct.proxy.rlwy.net",
        port: 5432,
        dialect: "postgres",
        dialectOptions: {
          ssl: {
            require: true, // This will help you. But you will see nwe error
            rejectUnauthorized: false, // This line will fix new error
          },
        },
      })
    : new Sequelize(
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
