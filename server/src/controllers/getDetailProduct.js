const axios = require("axios");
const getById = async (req, res) => {
    const { idKey } = req.params;
    try {
        const response = await axios.get(`http://localhost:5000/sneakers/`);
        if (response.data) {
            const responseSneakers = response.data;
            const sneaker = responseSneakers.find((sneaker) => sneaker.id === parseInt(idKey, 10));

            if (sneaker) {
                const result = {
                    id: sneaker.id,
                    name: sneaker.model,
                    size: sneaker.size,
                    brand: sneaker.brand,
                    price: parseFloat(sneaker.price.replace(",", ".")),
                    colors: Array.isArray(sneaker.colors) ? sneaker.colors : [],
                    image: Array.isArray(sneaker.image) ? sneaker.image : [],
                };

                return res.status(200).json(result);
            } else {
                return res.status(404).send("No hay un sneaker con ese id");
            }
        } else {
            return res.status(404).send("No hay data en la respuesta");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports={
    getById
}