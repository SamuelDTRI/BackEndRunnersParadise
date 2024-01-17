const { Product } = require("../../db");
const { Sequelize } = require("sequelize");

const getProductByName = async (name) => {
    const productByName = await Product.findAll({
      where: {
        name: {
          [Sequelize.Op.iLike]: `%${name}%`,
        },
      },
    });

    const results = productByName.map(sneaker => ({
        id: sneaker.id,
        name: sneaker.name,
        size: sneaker.size,
        brand: sneaker.brand,
        price: sneaker.price,
        colors: Array.isArray(sneaker.colors) ? sneaker.colors : [],
        image: Array.isArray(sneaker.image) ? sneaker.image : [],
    }))
    
    return results; 

};

module.exports = getProductByName;