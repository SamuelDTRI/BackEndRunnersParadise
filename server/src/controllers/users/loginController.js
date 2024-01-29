const bcrypt = require("bcrypt");
const { User } = require("../../db");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    return res.status(400).send({ message: "Usuario no existe" });
  }
  console.log(user);

  const validPassword = password === user.password;
  console.log(password);
  console.log(validPassword);
  console.log(user.password);
  if (!validPassword) {
    return res.status(400).send({ message: "Contraseña incorrecta" });
  }

  if (validPassword) {
    const response = {
      id: user.id,
      name: user.name,
      surName: user.surName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      country: user.country,
      admin: user.admin
    };
    return res.json(response);
  }
};

module.exports = {
  login,
};
