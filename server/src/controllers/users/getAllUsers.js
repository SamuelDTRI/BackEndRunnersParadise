const axios = require("axios");
const { User } = require("../../db");

const allUsers = async () => {
  const response = await User.findAll();
  const mappedSneakers = response.map((user) => ({
    id: user.id,
    name: user.name,
    surName: user.surName,
    email: user.email,
    password: user.password,
  }));
  console.log("testing");
  return mappedSneakers;
};
module.exports = {
    allUsers,
};
