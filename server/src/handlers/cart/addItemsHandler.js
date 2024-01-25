const addItemsController = require("../../controllers/cart/addItemsController");

const addItemsHandler = async (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body;
  try {
    const response = await addItemsController(userId, productId, quantity);
    console.log("añadiendo items con estos datos:", userId, productId);
    res.status(200).json(response);
  } catch (error) {
    res
      .status(404)
      .json({
        error: error.message || "No se econtraron items con este id:",
        userId,
      });
  }
};

module.exports = addItemsHandler;
