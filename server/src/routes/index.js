const { Router } = require("express");
const productsRouter = require("./productsRouter");
const reviewsRouter = require("./reviewsRouter");
const usersRouter = require("./usersRouter");
const paymentRoute = require("./paymentRoute");

const mainRouter = Router();

mainRouter.use("/products", productsRouter);
mainRouter.use("/", reviewsRouter);
mainRouter.use("/users", usersRouter);
mainRouter.use("/payment", paymentRoute);

// router.get("/all",detail )
// const {detail} = require("../controllers/getAllProducts")
// const {getById} = require ("../controllers/getDetailProduct.js")
// router.get('/detail/:idKey',getById);

module.exports = mainRouter;
