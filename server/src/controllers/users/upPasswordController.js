const { User } = require('../../db');

const updatePassword = async (req, res) => {
  const { idKey } = req.params;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findByPk(idKey);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Log de datos recibidos
    console.log('Datos recibidos en el controlador:', { idKey, currentPassword, newPassword });

    // Validar la contraseña actual
    if (!currentPassword) {
      console.log('Contraseña actual no proporcionada');
      return res.status(400).json({ message: 'Contraseña actual no proporcionada' });
    }

    // Comparación directa sin usar bcrypt
    if (currentPassword !== user.password) {
      console.log('Contraseña actual incorrecta. Mensaje desde el controlador.');
      return res.status(400).json({ message: 'Contraseña actual incorrecta' });
    }

    // Actualizar la contraseña solo si se proporciona una nueva
    if (newPassword) {
      user.password = newPassword;
      await user.save();
    }

    return res.json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = {
  updatePassword,
};