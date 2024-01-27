const addItemsController = require("../../controllers/cart/addItemsController");

const addItemsHandler = async (req, res) => {
  const { userId, productId } = req.params;
  const { name, price, colors, size, quantity } = req.body;
  console.log("userId:", userId);
  console.log("productId:", productId);
  console.log("name:", name);
  console.log("quantity:", quantity);
  console.log("price:", price);
  console.log("colors:", colors);
  console.log("size:", size);
  try {
    const response = await addItemsController(
      userId,
      productId,
      quantity,
      name,
      price,
      colors,
      size
    );
    console.log(
      "añadiendo items con estos datos:",
      userId,
      productId,
      name,
      price,
      colors,
      size,
      quantity
    );
    res.status(200).json(response);
  } catch (error) {
    res.json({
      error: error.message || "No se econtraron items con este id:",
      userId,
    });
  }
};

module.exports = addItemsHandler;
