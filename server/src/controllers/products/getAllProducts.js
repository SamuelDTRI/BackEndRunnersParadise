const axios = require("axios");
const { Product } = require("../../db");
const allProducts = async () => {
  const response = await Product.findAll();
  const mappedSneakers = response.map((sneaker) => ({
    id: sneaker.id,
    name: sneaker.name,
    size: sneaker.size,
    brand: sneaker.brand,
    price: sneaker.price,
    colors: Array.isArray(sneaker.colors) ? sneaker.colors : [],
    image: sneaker.image
  }));
  console.log("se ingresaron correctamente");
  return  mappedSneakers;
};
module.exports = {
  allProducts,
};
