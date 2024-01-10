const { Router } = require("express");
const getProductByIdHandler = require("../handlers/products/productByIdHandler");
const allProductsHandler = require("../handlers/products/allProductsHandler");
const postProductsHandler = require("../handlers/products/postProduct");
const validateProducts = require("../middlewares/products/productsMiddleware");
const getProductByNameHandler = require("../handlers/products/productByNameHandler")

const productsRouter = Router();

productsRouter.get("/search", getProductByNameHandler);
productsRouter.get("/", allProductsHandler);
productsRouter.post("/create", validateProducts, postProductsHandler);
productsRouter.get("/detail/:idKey", getProductByIdHandler);

module.exports = productsRouter;
