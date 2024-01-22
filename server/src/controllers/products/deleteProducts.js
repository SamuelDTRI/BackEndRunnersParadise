const { Product } = require("../../db");
const {deleteImage} = require ("../../helpers/cloudinary/cloudinary")

const deleteProducts = async (idKey) => {
    const response = await Product.findByPk(idKey);
    if (!response) {
        throw new Error('No se encontró el producto.');
    }
    await deleteImage(response.image.public_id)
    await response.destroy();
    return response;
}

module.exports = {
    deleteProducts
}