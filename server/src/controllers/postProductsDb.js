const { Product } = require("../db");

const postProduct = async (name, size, price, colors, image) => {
  const postInDb = await Product.create({ name, size, price, colors, image });
  return postInDb;
};

module.exports = { postProduct };
