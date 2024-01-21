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

    if (price) {
      productsFound.sort((a, b) => (price === 'min') ? a.price - b.price : b.price - a.price);
    }
    
    const startIndex = (setCurrentPage - 1) * pageSize;
    const endIndex = startIndex + parseInt(pageSize, 10);
    const paginatedResponse = productsFound?.slice(startIndex, endIndex);
  
    if (paginatedResponse) {
      return res.status(200).json({
        paginatedResponse ,
        setCurrentPage,
        totalSneakers : productsFound.length
      });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getProductByNameHandler;