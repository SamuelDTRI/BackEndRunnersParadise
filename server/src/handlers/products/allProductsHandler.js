const {allProducts} = require("../../controllers/getAllProducts")

const allProductsHandler = async (req, res) => {
  try {
    const response = await allProducts()
    res.status(200).json(response)
  } catch (error) {
    res.status(404).send("Not Found All Products");
  }
};

module.exports = allProductsHandler;