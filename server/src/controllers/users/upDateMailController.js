const { User } = require('../../db');

const updateMail = async (req, res) => {
  const { idKey } = req.params;
  const { newEmail, currentPassword } = req.body;

  try {
    const user = await User.findByPk(idKey);

    if (!user) {
      console.log('Usuario no encontrado');
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    console.log('Datos recibidos en el controlador updateUser:', { newEmail, currentPassword });
    console.log('Contraseña almacenada en la base de datos:', user.password);

    // Verificar que la contraseña actual no sea nula
    if (!currentPassword) {
      console.log('Contraseña actual no proporcionada');
      return res.status(400).json({ message: 'Contraseña actual no proporcionada' });
    }

    // Validar la contraseña actual antes de la actualización
    console.log('Comparando contraseñas planas');
    console.log('Contraseña plana proporcionada:', currentPassword);
    console.log('Contraseña almacenada (antes de hash):', user.password);

    // Comparación directa sin utilizar bcrypt
    if (currentPassword !== user.password) {
      console.log('Contraseña actual incorrecta. Contraseña proporcionada:', currentPassword);
      return res.status(400).json({ message: 'Contraseña actual incorrecta' });
    }

    console.log('Antes de la actualización. Email actual:', user.email, ', Nuevo email:', newEmail);
    // Actualizar el correo electrónico solo si la contraseña es válida
    await user.update({ email: newEmail });
    console.log('Después de la actualización. Nuevo email en la base de datos:', user.email);

    return res.json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = {
  updateMail,
};