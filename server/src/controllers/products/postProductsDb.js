const { Product } = require("../../db");
const {uploadImage} = require( "../../helpers/cloudinary/cloudinary")
const fs = require ("fs-extra")

const postProduct = async (name, size, brand, price, colors, req, image,description) => {
  console.log("Iniciando postProduct");
  const maxId = await Product.max('id');
  const newId = maxId + 1;
  console.log("ID del nuevo producto: ", newId);
  const postInDb = await Product.create({ id: newId, name, size, brand, price, colors, req, image: [],description });
  console.log("Producto creado: ", postInDb);
  console.log("informacion imagen " ,req.files?.image)
  if (req.files?.image && req.files?.image.length>0 ) {
    console.log("Subiendo imágenes a Cloudinary");

    // Utilizar Promise.all para manejar múltiples subidas en paralelo
    const uploadPromises = req.files.image.map(async (file) => {
      const result = await uploadImage(file.tempFilePath);
      console.log("Resultado de la subida a Cloudinary: ", result);
      return {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
    });

    console.log("uploadPromises", uploadPromises)
    const uploadedImages = await Promise.all(uploadPromises);

    // Asignar las imágenes subidas al producto
    console.log("uploadImage prueba ", uploadPromises)
    postInDb.image = uploadedImages;
    console.log(image)

      console.log("Eliminando archivo temporal");
      await Promise.all(req.files.image.map(async (file) => {
        await fs.unlink(file.tempFilePath);
      }));
      console.log("Guardando producto en la base de datos");
      await postInDb.save();
  } else {
    const result = await uploadImage(req.files.image.tempFilePath)
    postInDb.image = [
      {
      public_id : result.public_id,
      secure_url : result.secure_url
    }
  ]
    await fs.unlink(req.files.image.tempFilePath)
    console.log(result)
    await postInDb.save();
  }
  console.log("Producto final: ", postInDb);
  return postInDb;
};


module.exports = { postProduct };



