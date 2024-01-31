const getAllReviews = require("../controllers/reviews/getAllReviews");
const reviewsController = require("../controllers/reviews/reviewsController");
const { Router } = require("express");


const reviewsRouter = Router();

reviewsRouter.post("/products/detail/:idKey", reviewsController.postReviews);
reviewsRouter.get("/", getAllReviews);
reviewsRouter.get("/products/:idKey", reviewsController.getReviewsByProduct);
reviewsRouter.get("/reviews/:reviewId", reviewsController.getReviewById)
reviewsRouter.delete("/delete/:productId/:reviewId", reviewsController.deleteReviews);



module.exports = reviewsRouter;

