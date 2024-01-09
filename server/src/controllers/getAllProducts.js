const axios = require("axios");

const detail = async (req, res) => {
  try {
    const response = await axios.get("http://localhost:5000/sneakers");
    const apiSneakers = response.data;

    const mappedSneakers = apiSneakers.map((sneaker) => {
      return {
        id: sneaker.id,
        name: sneaker.model,
        size: sneaker.size,
        brand: sneaker.brand,
        price: parseFloat(sneaker.price.replace(",", ".")),
        colors: Array.isArray(sneaker.colors) ? sneaker.colors : [],
        image: Array.isArray(sneaker.image) ? sneaker.image : [],
      };
    });
    const dbSneakers = mappedSneakers;
    console.log("se ingresaron correctamente");
    return res.status(200).json(dbSneakers);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
module.exports = {
    detail
}