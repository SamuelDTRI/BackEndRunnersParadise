const bcrypt = require('bcrypt');
const { User } = require('../../db');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(400).send({ message: 'Usuario no existe' });
    }

    let validPassword;

    // Verificar si la contraseña almacenada es un hash
    const isHashedPassword = user.password.startsWith('$2b$');

    if (isHashedPassword) {
      // Comparar la contraseña proporcionada con el hash almacenado utilizando bcrypt.compare
      validPassword = await bcrypt.compare(password, user.password);
    } else {
      // Comparar la contraseña plana con la contraseña almacenada directamente
      validPassword = password === user.password;
    }

    if (!validPassword) {
      console.log('Contraseña proporcionada:', password);
      console.log('Contraseña almacenada (hash):', user.password);
      console.log('Comparación de contraseñas (validPassword):', validPassword);
      return res.status(400).send({ message: 'Contraseña incorrecta' });
    }

    const response = {
      id: user.id,
      name: user.name,
      surName: user.surName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      country: user.country,
      profilePicture: user.profilePicture,
      paymentMethods: user.paymentMethods || null,
      rol: user.rol,
    };

    
    return res.json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = {
  login,
};