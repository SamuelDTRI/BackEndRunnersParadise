const { Review, User } = require("../../db");

const postReviewsController = async (req, res) => {
    try {
        const { userId, idKey } = req.params;

        const userExists = await User.findByPk(userId);
        if (!userExists) {
            console.log('Usuario no encontrado. userId:', userId);
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        console.log('userId:', userId);
        console.log('idKey:', idKey);

        const newReview = await Review.create({
            content: req.body.content,
            rating: req.body.rating,
            userId: userId,
            productId: idKey,
        });

        res.status(201).json(newReview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
  
module.exports = postReviewsController;
