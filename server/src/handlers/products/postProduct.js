const { postProduct } = require("../../controllers/postProductsDb");

const postProductsHandler = async (req, res) => {
  const { name, size, price, colors, image } = req.body;
  try {
    const response = await postProduct(name, size, price, colors, image);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

module.exports = postProductsHandler;
