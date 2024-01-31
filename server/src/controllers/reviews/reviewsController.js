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

const deleteReviews = async (req, res) => {
  try {
    // Extraer el ID de la revisión y el ID del producto de los parámetros de la URL
    const { productId, reviewId } = req.params;

    // Verificar que ambos IDs estén presentes
    if (!productId || !reviewId) {
      return res.status(400).json({ error: 'ID de producto y/o ID de revisión no proporcionados.' });
    }

    // Busca la revisión por su ID y el ID del producto y elimínala
    const deletedReviewsCount = await Review.destroy({
      where: {
        id: reviewId,
        productId: productId,
      },
    });

    // Verifica si se eliminó alguna revisión
    if (deletedReviewsCount === 0) {
      return res.status(404).json({ error: 'Revisión no encontrada.' });
    }

    // Devuelve una respuesta de éxito
    res.status(200).json({ success: true, message: 'Revisión eliminada correctamente.' });
  } catch (error) {
    console.error('Error al eliminar la revisión:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};


const getReviewById = async (req, res) => {
  try {
    const { reviewId } = req.params;
    
    // Verificar si reviewId está presente
    if (!reviewId) {
      return res.status(400).json({ error: 'ID de revisión no proporcionado.' });
    }

    // Buscar la revisión por ID
    const review = await Review.findByPk(reviewId);

    // Verificar si se encontró la revisión
    if (!review) {
      return res.status(404).json({ error: 'Revisión no encontrada.' });
    }

    // Devolver la revisión encontrada
    res.status(200).json(review);
  } catch (error) {
    console.error('Error al obtener la revisión por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

module.exports = { postReviews, getReviewsByProduct, deleteReviews, getReviewById};