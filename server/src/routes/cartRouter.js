const { Router } = require("express");
const getCartItemsHandler = require("../handlers/cart/getCartItemsHandler");
const addItemsHandler = require("../handlers/cart/addItemsHandler");
const updateItemsHandler = require("../handlers/cart/updateItemsHandler");
const deleteItemsHandler = require("../handlers/cart/deleteItemsHandler");

const cartRouter = Router();

cartRouter.get("/:userId", getCartItemsHandler);
cartRouter.post("/:userId/:productId", addItemsHandler);
cartRouter.put("/:userId/:productId", updateItemsHandler);
cartRouter.delete("/:userId/:productId", deleteItemsHandler);

module.exports = cartRouter;
