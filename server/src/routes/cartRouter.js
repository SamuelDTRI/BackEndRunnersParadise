const { Router } = require("express");
const getCartItemsHandler = require("../handlers/cart/getCartItemsHandler");

const cartRouter = Router();

cartRouter.get("/:userId", getCartItemsHandler);
cartRouter.post("/add")

module.exports = cartRouter;
