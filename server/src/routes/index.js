const { Router } = require("express");
const productsRouter = require("./productsRouter");
const reviewsRouter = require("./reviewsRouter");
const usersRouter = require("./usersRouter");
const cartRouter = require("./cartRouter");

const mainRouter = Router();

mainRouter.use("/products", productsRouter);
mainRouter.use("/reviews", reviewsRouter);
mainRouter.use("/users", usersRouter);
mainRouter.use("/cart", cartRouter);

module.exports = mainRouter;
