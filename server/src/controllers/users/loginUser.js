const { User } = require("../../db");

const loginController = async (req,res) => {
  const { email, password } = req.body;
  try {
    const response = await User.findAll({ where: { email, password } })
  } catch (error) {
    
  }
};

module.exports = loginController;
