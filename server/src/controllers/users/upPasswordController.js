const { User } = require('../../db');
const nodemailer = require('nodemailer');

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

      // Envía el correo electrónico de notificación
      await sendNotificationEmail(user.name, user.email);

      return res.json({ message: 'Contraseña actualizada correctamente' });
    }

    return res.json({ message: 'No se proporcionó una nueva contraseña' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};

const sendNotificationEmail = async (name, email) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'runnersparadisecompany@gmail.com',
      pass: 'uorm sckl nuoo zfcc',
    },
  });

  try {
    const message = {
      from: 'runnersparadisecompany@gmail.com',
      to: email,
      subject: '¡Tu contraseña en Runners Paradise ha sido modificada!',
      html: `
        <div style="font-family: 'Arial', sans-serif; padding: 20px; background-color: #f4f4f4;">
          <h2 style="text-align: center; color: #333; margin-top: 20px;">¡Hola ${name}!</h2>
          <p style="text-align: center; color: #555; font-size: 16px;">Te informamos que tu contraseña en Runners Paradise ha sido modificada correctamente.</p>
          <p style="text-align: center; color: #555; font-size: 16px;">Si no realizaste esta acción, por favor contáctanos de inmediato.</p>
          <p style="text-align: center; color: #555; font-size: 16px;">¡Gracias por ser parte de Runners Paradise!</p>
          <p style="text-align: center; color: #888; font-size: 14px;">Atentamente,<br>El equipo de Runners Paradise</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(message);
    console.log('Correo electrónico de notificación enviado:', info);
  } catch (error) {
    console.error('Error al enviar el correo electrónico de notificación:', error);
    throw error;
  } finally {
    transporter.close();
  }
};

module.exports = {
  updatePassword,
};