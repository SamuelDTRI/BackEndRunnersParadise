const { User } = require('../../db');

const updateProfilePicture = async (req, res) => {
  const { idKey } = req.params;
  const { profilePicture } = req.body;

  try {
    const user = await User.findByPk(idKey);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    console.log('Datos recibidos en el controlador updateUser:', { idKey, profilePicture });

    // Actualizar solo la propiedad profilePicture con el nombre del archivo
    await user.update({ profilePicture });

    console.log('Usuario actualizado correctamente.');

    return res.json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error('Error en el controlador updateUser:', error);
    return res.status(500).json({ error: 'Error en el servidor al actualizar el usuario' });
  }
};

module.exports = {
  updateProfilePicture,
};