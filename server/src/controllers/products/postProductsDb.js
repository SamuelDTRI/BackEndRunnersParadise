const { Product, Review } = require("../../db")

const postProduct = async (data) => {
  try {
    console.log('Datos recibidos en el controlador:', data);

    const product = await Product.create(data);

    console.log('Producto creado:', product);

    return product;
  } catch (error) {
    console.error('Error en el controlador:', error);
    throw new Error(error.message);
  }
};

module.exports = { postProduct };



const deleteAllProducts = async () => {
 try {
   // Primero, truncamos la tabla Review
   await Review.destroy({ truncate: true, cascade: true });
   // Luego, truncamos la tabla Product
   await Product.destroy({ truncate: true, cascade: true });
   console.log('All products and reviews deleted successfully!');
 } catch (error) {
   console.error('Error while deleting all products and reviews:', error);
 }
};

module.exports = { postProduct, deleteAllProducts };
 
 module.exports = { postProduct, deleteAllProducts };