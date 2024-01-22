// reviewsController.js

const { Review } = require("../../db");

const postReviews = async (req, res) => {
  try {
    // Extraer datos de la URL y el cuerpo de la solicitud
    const { idKey, userId } = req.params;
    const { content, rating } = req.body;
    console.log("esto viene de controlleer reviews", idKey, userId, content, rating)

    // Verifica que los datos necesarios estén presentes
    if (!idKey || !userId || !content || !rating) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // Realiza operaciones con los datos, por ejemplo, crea una nueva revisión
    const review = await Review.create({
      content,
      rating,
      userId,
      productId: idKey,
    });

    // Puedes realizar otras operaciones según tus necesidades, por ejemplo, actualizar productos, usuarios, etc.

    // Envía una respuesta al cliente
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