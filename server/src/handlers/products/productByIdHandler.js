const { getById } = require("../../controllers/getDetailProduct");

const getProductByIdHandler = async (req, res) => {
    const { idKey } = req.params;
    try {
        const response = getById(idKey);
    } catch (error) {
        
    }
};

module.exports = getProductByIdHandler;