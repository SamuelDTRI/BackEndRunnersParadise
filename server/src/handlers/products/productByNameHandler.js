const getProductByName = require("../../controllers/products/getProductByName");

const getProductByNameHandler = async (req, res) => {
  try {
    const { name } = req.params;

    if (!name) {
      return res.status(400).json({ error: "A name is required for the search." });
    }

    const productsFound = await getProductByName(name);

    if (productsFound.length > 0) {
      return res.status(200).json(productsFound);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getProductByNameHandler;