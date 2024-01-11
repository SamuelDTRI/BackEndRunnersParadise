const {postUser} = require("../../controllers/users/postUsersDb")
const postUsersHandler = async (req, res) => {
    const { name, surName, email, password } = req.body;
    try {
      const response = await postUser(name, surName, email, password);
      res.status(200).json(response);
    } catch (error) {
      res.status(404).send({ error: error.message });
    }
  };

module.exports = postUsersHandler;