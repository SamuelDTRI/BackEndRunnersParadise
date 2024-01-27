const { Product } = require("../../db");
const {uploadImage} = require( "../../helpers/cloudinary/cloudinary")
const fs = require ("fs-extra")

const postProduct = async (name, size, brand, price, colors, req, image) => {
  console.log("Iniciando postProduct");
  const maxId = await Product.max('id');
  const newId = maxId + 1;
  console.log("ID del nuevo producto: ", newId);
  const postInDb = await Product.create({ id: newId, name, size, brand, price, colors, req, image: { public_id: '', secure_url: '' }, });
  console.log("Producto creado: ", postInDb);
  if(req.files?.image){
      console.log("Subiendo imagen a Cloudinary");
      const result = await uploadImage(req.files.image.tempFilePath);
      console.log("Resultado de la subida a Cloudinary: ", result);
      postInDb.image = {
          public_id : result.public_id,
          secure_url : result.secure_url
      }
      console.log("Eliminando archivo temporal");
      await fs.unlink(req.files.image.tempFilePath);
      console.log("Guardando producto en la base de datos");
      await postInDb.save();
  }
  console.log("Producto final: ", postInDb);
  return postInDb;
};


module.exports = { postProduct };



