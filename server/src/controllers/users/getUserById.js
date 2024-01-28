const axios = require("axios");
const { User } = require("../../db");
const getUserById = async (idKey) => {
  const response = await User.findByPk(idKey);
  if (response) {
    const result = {
      id: response.id,
      name: response.name,
      surName: response.surName,
      email: response.email,
      password: response.password,
    };
    console.log("op");
    return result;
  }
};

module.exports = {
  getUserById,
};
