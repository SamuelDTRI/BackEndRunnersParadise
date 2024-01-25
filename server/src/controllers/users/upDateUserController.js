const { User } = require('../../db');

const updateUser = async (req, res) => {
  const { idKey } = req.params;
  const updatedFields = req.body;

  try {
    const user = await User.findByPk(idKey);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Obtén todos los campos del usuario existente
    const userFields = user.toJSON();

    // Sobrescribe solo los campos proporcionados
    Object.assign(userFields, updatedFields);

    // Actualiza el usuario con los campos combinados
    await user.update(userFields);

    return res.json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = {
  updateUser,
};