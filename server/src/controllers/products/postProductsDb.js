const { Product } = require("../../db");

const postProduct = async (name, size, price, colors, image) => {
    const maxId = await Product.max('id');
    const newId = maxId + 1;
  const postInDb = await Product.create({ id:newId, name, size, price, colors, image });
  return postInDb;
};

module.exports = { postProduct };
