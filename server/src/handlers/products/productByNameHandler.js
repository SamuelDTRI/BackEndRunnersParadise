const getProductByName = require("../../controllers/products/getProductByName");

const getProductByNameHandler = async (req, res) => {
  try {
    const { name } = req.params;
    const {page , pageSize,price} = req.query
    const setCurrentPage = (page && parseInt(page, 10) > 0) ? parseInt(page, 10) : 1;
    if (!name) {
      return res.status(400).json({ error: "A name is required for the search." });
    }

    const productsFound = await getProductByName(name);

    if (productsFound.length > 0) {
      return res.status(200).json({
        productsFound :productsFound ,
        totalSneakers : productsFound.length
      });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    return res.status(404).send(`Product with name not found: ${this.name}`);
  }
};

module.exports = getProductByNameHandler;