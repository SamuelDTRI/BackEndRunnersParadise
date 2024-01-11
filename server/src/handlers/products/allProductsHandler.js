const {allProducts} = require("../../controllers/products/getAllProducts")

const allProductsHandler = async (req, res) => {
  try {
    const { brand, size ,colors} = req.query;
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

    res.status(200).json(response)
  } catch (error) {
    res.status(404).send("Not Found All Products");
  }
};

module.exports = allProductsHandler;