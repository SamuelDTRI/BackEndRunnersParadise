const axios = require("axios");
const {Product} = require("../db")
const getById = async (idKey) => {
  const response = await Product.findByPk(idKey);
  if (response) {   
      const result = {
        id: response.id,
        name: response.name,
        size: response.size,
        brand: response.brand,
        price:  response.price,
        colors: Array.isArray(response.colors) ? response.colors : [],
        image: Array.isArray(response.image) ? response.image : [],
      };
      console.log("op")
      return result;
      
     }
};

module.exports = {
  getById,
};
