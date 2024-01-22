const { Review } = require("../../db");

const getAllReviews = async (req, res) => {
    try {
        const allReviews = await Review.findAll();

        res.status(200).json(allReviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = getAllReviews;