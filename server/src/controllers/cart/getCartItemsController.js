const { Cart, CartItem, Product } = require("../../db");

const getCartItemsController = async (userId) => {
  const cart = await Cart.findOne({
    where: { userId },
    include: [
      {
        model: CartItem,
        include: [Product],
      },
    ],
  });

  return cart;
};

module.exports = getCartItemsController;
