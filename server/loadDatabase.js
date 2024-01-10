const axios = require("axios");
const { Product } = require("./src/db");

const loadDatabase = async () => {
  const allSnikersJson = await Product.findAll();
  if (!allSnikersJson.length) {
    const jsonRes = await axios.get("http://localhost:5000/sneakers");
    let jsonSnikers = jsonRes.data.map((sneakers) => {
      return {
        id: sneakers.id,
        name: sneakers.model,
        size: sneakers.size, 
        brand: sneakers.brand,
        price: parseFloat(sneakers.price.replace(",", ".")),
        colors: Array.isArray(sneakers.colors) ? sneakers.colors : [],
        image: Array.isArray(sneakers.image) ? sneakers.image : [],
      };
    });
    await Product.bulkCreate(jsonSnikers);
    console.log("Database has been loaded");
  }
};

module.exports = loadDatabase;
