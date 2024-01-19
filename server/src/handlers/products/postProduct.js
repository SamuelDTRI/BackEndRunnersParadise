const { postProduct } = require("../../controllers/products/postProductsDb");

const postProductsHandler = async (req, res) => {
  const { name, size,brand, price, colors ,image} = req.body;
  try {
    const response = await postProduct(name, size, brand, price, colors,req,image);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).send("Error while creating the product, please check your information again.");
  }
};

module.exports = postProductsHandler;
