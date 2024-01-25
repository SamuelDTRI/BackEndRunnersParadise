const { CartItem } = require("../../db")

const updateItemsController = async (userId, productId, quantity) => {
  const cartItem = await CartItem.findOne({
    where: { cartId: userId, productId: productId },
  });

  if (!cartItem) {
    throw new Error("CartItem not found");
  }

  cartItem.quantity = quantity;
  await cartItem.save();

  return cartItem;
};

module.exports = updateItemsController;
