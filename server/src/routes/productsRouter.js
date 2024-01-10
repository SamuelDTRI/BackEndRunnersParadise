const { Router } = require("express");
const getProductByIdHandler = require("../handlers/products/productByIdHandler");
const allProductsHandler = require("../handlers/products/allProductsHandler");

const productsRouter = Router();

productsRouter.get("/", allProductsHandler);
productsRouter.get("/detail/:idKey", getProductByIdHandler);

module.exports = productsRouter;