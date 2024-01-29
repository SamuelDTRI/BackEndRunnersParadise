const getCartItemsController = require("../../controllers/cart/getCartItemsController");

const getCartItemsHandler = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await getCartItemsController(userId);
    console.log("buscando item con id de usuario:", userId);
    res.status(200).json(cart);
  } catch (error) {
    res
      .status(404)
      .send(
        `Error al obtener los items del carrito con el id de usuario: ${userId}`
      );
  }
};

module.exports = getCartItemsHandler;
