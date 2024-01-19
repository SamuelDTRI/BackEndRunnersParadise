const { allProducts } = require("../../controllers/products/getAllProducts")

const allProductsHandler = async (req, res) => {
  try {
    const { brand, size ,colors,price,page , pageSize  } = req.query;
    const setCurrentPage = (page && parseInt(page, 10) > 0) ? parseInt(page, 10) : 1;
    let response = await allProducts();
    
    if (brand) {
      response = response.filter(sneaker => sneaker.brand === brand);
    }
    
    if (size) {
      response = response.filter(sneaker => sneaker.size.includes(size));
    }
    
    if (colors) {
      response = response.filter(sneaker => sneaker.colors.includes(colors));
    }
    
    if (price) {
      response.sort((a, b) => (price === 'min') ? a.price - b.price : b.price - a.price);
    }
    

    const startIndex = (setCurrentPage - 1) * pageSize;
    const endIndex = startIndex + parseInt(pageSize, 10);
    const paginatedResponse = response?.slice(startIndex, endIndex);
  
    res.status(200).json({
      paginatedResponse,
      setCurrentPage,
      totalSneaker: response.length,
    });
  } catch (error) {
    res.status(404).send("Failed to find all users, check your request again ...");
  }
};

module.exports = allProductsHandler;