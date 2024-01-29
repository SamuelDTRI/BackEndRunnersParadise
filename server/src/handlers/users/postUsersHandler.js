const {postUser} = require("../../controllers/users/postUsersDb")
const postUsersHandler = async (req, res) => {
    const { name, surName, email, password, rol } = req.body;
    try {
      console.log("Handling user creation:", req.body);
      const response = await postUser(name, surName, email, password, rol);
      res.status(201).json(response);
    } catch (error) {
      console.error("Error handling user creation:", error);
      res.status(404).send({ error: "Creation error, please verify your information" });
    }
  };

module.exports = postUsersHandler;