const { allProducts } = require("../../controllers/products/getAllProducts")

const allProductsHandler = async (req, res) => {
  try {
    const { brand, size, colors, price} = req.query;
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

    res.status(200).json(response)
  } catch (error) {
    res.status(404).send("Failed to find all users, check your request again ...");
  }
};

module.exports = allProductsHandler;