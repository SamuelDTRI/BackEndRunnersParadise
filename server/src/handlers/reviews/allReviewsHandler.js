const allReviewsHandler = async (req, res) => {
    try {
        console.log("allReviewsHandler");
    } catch (error) {
        res.status(404).send("Not Found AllReviewsHandler")
    }
};

module.exports = allReviewsHandler;