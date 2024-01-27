const { Cart, CartItem, Product } = require("../../db");

const addItemsController = async (userId, productId, quantity, name, price, colors, size) => {
  const cart = await Cart.findOne({ where: { userId } });
  const product = await Product.findOne({ where: { id: productId } });
  console.log("Product Object:", product);

  console.log("userId:", userId);
  console.log("productId:", productId);
  console.log("quantity:", quantity);
  console.log("name:", name);
  console.log("price:", price);
  console.log("colors:", colors);
  console.log("size:", size);

  const cartItem = await CartItem.create({
    name : product.name,
    quantity : quantity,
    price : product.price,
    colors : colors,
    size : size,
    deleted: false,
    cartId: cart.id,
    productId: product.id
  });

  console.log(cartItem)

  return cartItem;
};

module.exports = addItemsController;
