const { Review } = require("../../db");

const postReviews = async (req, res) => {
  try {
    const { idKey, userId } = req.params;
    const { content, rating } = req.body;

    if (!idKey || !userId || !content || !rating) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const review = await Review.create({
      content,
      rating,
      userId,
      productId: idKey,
    });
    res.status(201).json({ success: true, review });
  } catch (error) {
    console.error('Error al procesar la revisión:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

const getReviewsByProduct = async (req, res) => {
  try {
    const { idKey } = req.params;

    // Obtener revisiones específicas de un producto
    const reviews = await Review.findAll({
      where: { productId: idKey },
    });

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { postReviews, getReviewsByProduct };