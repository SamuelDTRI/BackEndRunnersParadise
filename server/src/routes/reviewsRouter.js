const { Router } = require("express");
const allReviewsHandler = require("../handlers/reviews/allReviewsHandler");

const reviewsRouter = Router();

reviewsRouter.get("/", allReviewsHandler);

module.exports = reviewsRouter;
