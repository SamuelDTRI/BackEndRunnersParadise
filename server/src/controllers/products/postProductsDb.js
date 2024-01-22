const { Product } = require("../../db");
const {uploadImage} = require( "../../helpers/cloudinary/cloudinary")
const fs = require ("fs-extra")

const postProduct = async (name, size,brand, price, colors,req,image) => {
    const maxId = await Product.max('id');
    const newId = maxId + 1;
  const postInDb = await Product.create({ id:newId, name, size,brand, price, colors,  image: { public_id: '', secure_url: '' },});
  if(req.files?.image){
    const result = await uploadImage(req.files.image.tempFilePath)
    postInDb.image = {
      public_id : result.public_id,
      secure_url : result.secure_url
    }
    await fs.unlink(req.files.image.tempFilePath)
    console.log(result)
    await postInDb.save();
  }
  return postInDb;
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