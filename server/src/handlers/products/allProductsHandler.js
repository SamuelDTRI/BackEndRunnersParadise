const allProductsHandler = async (req, res) => {
  try {
    console.log("allProductsHandler");
  } catch (error) {
    res.status(404).send("Not Found All Products");
  }
};

module.exports = allProductsHandler;