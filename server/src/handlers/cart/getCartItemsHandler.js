const getCartItemsController = require("../../controllers/cart/getCartItemsController");

const getCartItemsHandler = async (req, res) => {
  try {
    const userId = req.params.userId; 
    const cart = await getCartItemsController(userId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).send(`Error al obtener los items del carrito con el id de usuario: ${userId}`);
  }
};

module.exports = getCartItemsHandler;
