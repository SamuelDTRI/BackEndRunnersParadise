const {deleteProducts} = require ("../../controllers/products/deleteProducts")
const deleteProductsHandler = async ( req,res) => {
    const {idKey} = req.params
    try {
        const response = await deleteProducts(idKey);
        res.status(200).json(response);
      } catch (error) {
        res.status(404).send({ error: error.message });
      }
}

module.exports = deleteProductsHandler;