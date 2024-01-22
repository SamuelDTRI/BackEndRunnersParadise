const axios = require("axios");
const {Product,Review} = require("../../db")
const getById = async (idKey) => {
  const response = await Product.findByPk(idKey, {
    include: [{ model: Review,  as: 'review' }],
  });
  if (response && response.review !== null) {
    const reviews = response['review'] || [];
    
    const result = {
      id: response.id,
      name: response.name,
      size: response.size,
      brand: response.brand,
      price: response.price,
      colors: Array.isArray(response.colors) ? response.colors : [],
      image: response.image,
      reviews: reviews.map(rew => ({
        id: rew.id,
        content: rew.content,
        rating: rew.rating,
      })) ,
    };
      console.log("op")
      return result;
      
     }
     return null
};

module.exports = {
  getById,
};
