const getAllReviews = require("../controllers/reviews/getAllReviews");
const reviewsController = require("../controllers/reviews/reviewsController");
const { Router } = require("express");

const reviewsRouter = Router();

// Ruta para manejar todas las revisiones
reviewsRouter.post("/products/detail/:idKey/:userId", reviewsController.postReviews);

reviewsRouter.get("/", getAllReviews);

// Ruta para obtener revisiones específicas de un producto
reviewsRouter.get("/products/:idKey", reviewsController.getReviewsByProduct);

module.exports = reviewsRouter;

