const { Cart, CartItem, Product } = require("../../db");

const addItemsController = async (userId, productId, quantity) => {
  const cart = await Cart.findOne({ where: { userId } });
  const product = await Product.findOne({ where: { id: productId } });

  if (!cart || !product) {
    throw new Error("Cart or product not found");
  }

  const cartItem = await CartItem.create({
    quantity,
    deleted: false,
    cartId: cart.id,  
    productId: product.id  
  });

  return cartItem;
};

module.exports = addItemsController;

