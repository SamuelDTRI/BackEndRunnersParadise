const getAllReviews = require("../controllers/reviews/getAllReviews");
const reviewsController = require("../controllers/reviews/reviewsController");
const { Router } = require("express");

const reviewsRouter = Router();

reviewsRouter.post("/products/detail/:idKey/:userId", reviewsController.postReviews);

reviewsRouter.get("/", getAllReviews);

reviewsRouter.get("/products/:idKey", reviewsController.getReviewsByProduct);

module.exports = reviewsRouter;