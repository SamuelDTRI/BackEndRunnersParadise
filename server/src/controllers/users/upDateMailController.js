const { User } = require('../../db');
const nodemailer = require('nodemailer');

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

    // Envía el correo electrónico de notificación
    await sendNotificationEmail(user.name, user.email);

    return res.json({ message: 'Usuario actualizado correctamente' });
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
      subject: '¡Tu correo en Runners Paradise ha sido modificado!',
      html: `
        <div style="font-family: 'Arial', sans-serif; padding: 20px; background-color: #f4f4f4;">
          <h2 style="text-align: center; color: #333; margin-top: 20px;">¡Hola ${name}!</h2>
          <p style="text-align: center; color: #555; font-size: 16px;">Te informamos que tu correo en Runners Paradise ha sido modificado correctamente.</p>
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

module.exports = { updateMail };