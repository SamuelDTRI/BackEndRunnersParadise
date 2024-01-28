const updateItemsController = require("../../controllers/cart/updateItemsController");

const updateItemsHandler = async (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body;
  try {
    const response = await updateItemsController(userId, productId, quantity);
    console.log("Editando informacion con id:", userId, productId, quantity);
    res.staus(200).json(response);
  } catch (error) {
    res
      .status(404)
      .json({ error: error.message || "Error al editar:", userId, productId });
  }
};

module.exports = updateItemsHandler;
