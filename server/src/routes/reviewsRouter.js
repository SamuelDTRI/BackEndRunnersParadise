const { Router } = require("express");
const getAllReviewsController = require("../controllers/reviews/getAllReviews");
const postReviewsController = require("../controllers/reviews/postReviews");

const reviewsRouter = Router();

reviewsRouter.get("/detail/:idKey", getAllReviewsController);
reviewsRouter.post("/products/detail/:idKey/:userId/reviews", postReviewsController);


module.exports = reviewsRouter;
