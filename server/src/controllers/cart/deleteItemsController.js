const { CartItem } = require("../../db")

const deleteItemsController = async (userId, productId) => {
  const cartItem = await CartItem.findOne({
    where: { cartId: userId, productId: productId },
  });

  if (!cartItem) {
    throw new Error("CartItem not found");
  }

  cartItem.deleted = true;
  await cartItem.save();

  return cartItem;
};

module.exports = deleteItemsController;
