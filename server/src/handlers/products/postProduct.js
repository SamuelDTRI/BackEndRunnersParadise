const { postProduct } = require('../../controllers/products/postProductsDb');

const postProductsHandler = async (req, res) => {
  const data = req.body;

  try {
    const response = await postProduct(data);
    res.status(200).json(response);
  } catch (error) {
    console.error('Error en el controlador:', error);
    res.status(400).send({ error: error.message });
  }
};

module.exports = postProductsHandler;
