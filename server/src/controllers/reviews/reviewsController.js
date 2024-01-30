const { Review } = require("../../db");

const postReviews = async (req, res) => {
  try {
    // Extraer datos de la URL y el cuerpo de la solicitud
    const { idKey } = req.params;
    const { content, rating, name, profileImage } = req.body;
    console.log("esto viene de controlleer reviews", idKey, content, rating, profileImage)

    // Verifica que los datos necesarios estén presentes
    if (!idKey || !content || !rating || !name || !profileImage) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const review = await Review.create({
      content,
      rating,
      name,
      profileImage,
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