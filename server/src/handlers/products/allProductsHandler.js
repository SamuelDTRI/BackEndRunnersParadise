const {allProducts} = require("../../controllers/products/getAllProducts")

const allProductsHandler = async (req, res) => {
  try {
    const { brand, size ,colors,price,page , pageSize  } = req.query;
    let response = await allProducts()

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

    const startIndex = (page-1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedResponse = response.slice(startIndex, endIndex)

    res.status(200).json(paginatedResponse)
  } catch (error) {
    res.status(404).send("Not Found All Products");
  }
};

module.exports = allProductsHandler;