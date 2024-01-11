const { User } = require("../../db");

const postUser = async (name, surName, email, password) => {
    const maxId = await User.max('id');
    const newId = maxId + 1;
  const postInDb = await User.create({ id:newId, name, surName, email, password });
  return postInDb;
};

module.exports = { postUser };