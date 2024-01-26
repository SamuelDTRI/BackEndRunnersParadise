const { User } = require("../../db");
const { v4: uuidv4 } = require('uuid');

const postUser = async (name, surName, email, password) => {
  const uuid = uuidv4();
  const postInDb = await User.create({ id: uuid, name, surName, email, password });
  return postInDb;
};

module.exports = { postUser };