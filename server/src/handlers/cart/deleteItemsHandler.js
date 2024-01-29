const deleteItemsController = require("../../controllers/cart/deleteItemsController");

const deleteItemsHandler = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const response = await deleteItemsController(userId, productId);
    console.log("Buscando para eliminar:", userId, productId);
    res.status(200).json(response);
  } catch (error) {
    res
      .status(404)
      .json({
        error: error.message || "No se pudo eliminar:",
        userId,
        productId,
      });
  }
};

module.exports = deleteItemsHandler;
